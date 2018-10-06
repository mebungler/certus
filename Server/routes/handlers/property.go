package handlers

import (
	"../../data/database"
	"../../logger"
	"encoding/json"
	"net/http"
	"../../data/models"
	"../../decoder"
)

func AddProperty(w http.ResponseWriter , r *http.Request)  {
	var property models.Passport
	decoder.Get(r.Body, &property)
	err := database.Add(property)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create property:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}