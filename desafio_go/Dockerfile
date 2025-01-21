FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY . .

RUN go mod download && go mod verify

RUN go build -o fullcycle_Rocks fullcycle_Rocks.go

FROM scratch

COPY --from=builder /app/fullcycle_Rocks /fullcycle_Rocks

CMD ["/fullcycle_Rocks"]