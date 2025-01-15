FROM golang:latest AS builder

WORKDIR /go/src/app

COPY . .

RUN go build -o fullcycle_Rocks fullcycle_Rocks.go


FROM scratch

WORKDIR /root

COPY --from=builder /go/src/app/fullcycle_Rocks .

CMD ["./fullcycle_Rocks"]