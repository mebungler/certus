package handlers

import (
	"../../data/database"
	"../../data/models"
	"../../decoder"
	"../../logger"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
)

func AddOperation(w http.ResponseWriter, r *http.Request) {
	operation, err := decoder.GetOperation(r.Body)
	a, _ := ioutil.ReadAll(r.Body)
	print(string(a))
	if err != nil {
		logger.LogErr(err)
	}
	err = database.AddOperation(operation)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create operation:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}

func GetOperations(w http.ResponseWriter, r *http.Request) {
	operations, err := database.GetAllOperations()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get operations:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Operations: operations}); err != nil {
		logger.LogErr(err)
	}
}

func GetAllPreOperation(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	operations := []models.Operation{}
	err := database.GetAllWithEagerLoading(&operations, params["component"])

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get passports:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Operations: operations}); err != nil {
		logger.LogErr(err)
	}
}

/*func GetOperation(w http.ResponseWriter, r *http.Request) {
	var customer models.Customer
	decoder.Get(r.Body, &customer)
	temp, err := database.GetCustomer(customer.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get customer:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Customers: []models.Customer{temp}}); err != nil {
		logger.LogErr(err)
	}
}*/

func UpdateOperation(w http.ResponseWriter, r *http.Request) {
	var operation models.Operation
	decoder.Get(r.Body, &operation)
	err := database.Update(operation)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to update opreation:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}

func RemoveOperation(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	operation := models.Operation{ID: params["id"]}
	err := database.Remove(operation)
	if err == nil {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Invalid credentials"}}); err != nil {
			logger.LogErr(err)
		}
	}
}
