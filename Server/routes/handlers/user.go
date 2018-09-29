package handlers

import (
	"../../decoder"
	"../../data/database"
	"../../data/models"
	"../../logger"
	"github.com/gorilla/mux"
	"net/http"
	"encoding/json"
)


func Index(w http.ResponseWriter, r *http.Request) {
	users,_ := database.GetAllUsers()
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(users); err != nil {
		logger.LogErr(err)
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	user,err:=decoder.GetUser(r.Body)
	if err != nil {
		logger.LogErr(err)
	}
	usr:=database.GetUserByEmail(user.Email)
	if usr.Password==user.Password {
		w.WriteHeader(http.StatusOK)
		if err:=json.NewEncoder(w).Encode(Response{User:usr}); err!=nil{
			logger.LogErr(err)
		}
	} else {
		w.WriteHeader(http.StatusBadRequest)
		if err:=json.NewEncoder(w).Encode(Response{Errors:Errors{Global:"Invalid credentials"}}); err!=nil{
			logger.LogErr(err)
		}
	}
}

func AddUser(w http.ResponseWriter, r *http.Request){
	user,err:=decoder.GetUser(r.Body)
	if err != nil {
		logger.LogErr(err)
	}
	err=database.AddUser(user)
	if err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		if err:=json.NewEncoder(w).Encode(Response{Errors:Errors{Global:"Failed to create user:\n"+err.Error()}}); err!=nil{
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)

}

func GetUsers(w http.ResponseWriter, r *http.Request){
	users,err:=database.GetAllUsers()
	if err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		if err:=json.NewEncoder(w).Encode(Response{Errors:Errors{Global:"Failed to get users:\n"+err.Error()}}); err!=nil{
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err:=json.NewEncoder(w).Encode(Response{Users:users}); err!=nil{
		logger.LogErr(err)
	}
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	params:=mux.Vars(r)
	user:=models.User{ID:params["id"]}
	err:=database.Get(&user)
	if err== nil {
		w.WriteHeader(http.StatusOK)
		if err:=json.NewEncoder(w).Encode(Response{User: user}); err!=nil{
			logger.LogErr(err)
		}
	} else {
		w.WriteHeader(http.StatusBadRequest)
		if err:=json.NewEncoder(w).Encode(Response{Errors:Errors{Global:"Invalid credentials"}}); err!=nil{
			logger.LogErr(err)
		}
	}
}