package main

import (
    "fmt"
    "net/http"
    "time"
)

type HttpResponse struct {
  url      string
  response *http.Response
  err      error
}


func asyncHttpGets(urls []string) []*HttpResponse {
  ch := make(chan *HttpResponse)
  responses := []*HttpResponse{}
  for _, url := range urls {
      go func(url string) {
          fmt.Printf("Fetching %s \n", url)
          resp, err := http.Get(url)
          ch <- &HttpResponse{url, resp, err}
      }(url)
  }

  for {
      select {
      case r := <-ch:
          fmt.Printf("%s was fetched\n", r.url)
          responses = append(responses, r)
          if len(responses) == len(urls) {
              return responses
          }
      case <-time.After(500 * time.Millisecond):
          fmt.Printf(".")
      }
  }
  return responses
}



func handler(w http.ResponseWriter, r *http.Request) {

    var urls = []string{"http://localhost:3001/", "http://localhost:3002/", "http://localhost:3003/"}
    asyncHttpGets(urls);
    fmt.Fprintf(w, "okay")
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":3000", nil)
}
