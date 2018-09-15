package logger

import (
	"log"
	"bytes"
	"os"
)

var Debug =true

func LogErr(err error){
	if !Debug{
		log.Fatal(err)
	}
	var (
		buf    bytes.Buffer
		logger = log.New(&buf, "logger: ", log.Lshortfile)
	)
	logger.Print(err)
	f,err:=os.OpenFile("log.txt",os.O_APPEND|os.O_WRONLY,0600)
	defer f.Close()
	f.Write(buf.Bytes())
}