use bytes::BufMut;
use futures::TryStreamExt;
use std::convert::Infallible;
use uuid::Uuid;
use warp::{
    multipart::{FormData, Part},
    Filter, Rejection, Reply,
};

static MAX_SIZE: u64 = 100_000_000; // 100 MB

#[tokio::main]
async fn main() {
    let cors = warp::cors()
        .allow_any_origin()
        .allow_methods(vec!["POST", "GET"]);

    let upload_route = warp::path("upload")
        .and(warp::post())
        .and(warp::multipart::form().max_length(MAX_SIZE))
        .and_then(upload)
        .with(cors.clone());

    let download_route = warp::path("files")
        .and(warp::fs::dir("../files/"))
        .with(cors.clone());

    let router = upload_route.or(download_route).recover(handle_rejection);

    println!("[+] 🚀 SERVER STARTED AT: http://localhost:8080");
    warp::serve(router).run(([0, 0, 0, 0], 8080)).await;
}

async fn upload(form: FormData) -> Result<impl Reply, Rejection> {
    let parts: Vec<Part> = form.try_collect().await.map_err(|e| {
        eprintln!("form error: {}", e);
        warp::reject::reject()
    })?;

    let mut file = "".to_string();

    for part in parts {
        if part.name() == "file" {
            let content_type = part.content_type();
            let file_extension;

            match content_type {
                Some(file_type) => {
                    let file_type_split: Vec<&str> = file_type.split("/").collect();

                    if &file_type_split.len() == &2 {
                        file_extension = file_type_split[1].to_owned();
                    } else {
                        eprintln!("[-] Invalid file type found: {}", file_type);
                        return Err(warp::reject::reject());
                    }
                }
                None => {
                    eprintln!("[-] File type could not be determined");
                    return Err(warp::reject::reject());
                }
            }

            let value = part
                .stream()
                .try_fold(Vec::new(), |mut vec, data| {
                    vec.put(data);
                    async move { Ok(vec) }
                })
                .await
                .map_err(|e| {
                    eprintln!("[-] Failed to read file: {}", e);
                    warp::reject::reject()
                })?;

            let file_name = format!("/files/{}.{}", Uuid::new_v4().to_string(), file_extension);
            let file_path = format!("..{}", file_name);

            file = file_name.clone();

            tokio::fs::write(&file_path, value).await.map_err(|e| {
                eprintln!("[-] Error writing file : {}", e);
                warp::reject::reject()
            })?;

            println!("[+] Created file: {}", file_name);
        }
    }

    Ok(warp::reply::json(&file))
}

async fn handle_rejection(err: Rejection) -> std::result::Result<impl Reply, Infallible> {
    let message = if err.is_not_found() {
        "Not Found"
    } else if err.find::<warp::reject::PayloadTooLarge>().is_some() {
        "Payload too large"
    } else {
        eprintln!("[-] Unhandled error: {:?}", err);
        "Internal Server Error"
    };

    Ok(warp::reply::json(&message))
}
