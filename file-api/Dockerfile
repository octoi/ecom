FROM rust

WORKDIR /file-api
EXPOSE 8080

COPY ./ ./api
RUN mkdir files

CMD cd api && cargo run