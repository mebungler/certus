package handlers

import (
	"../../data/models"
	"../../decoder"
	"encoding/json"
	"net/http"
	"../../data/database"
	"../../logger"
)
func AddModel(w http.ResponseWriter,r *http.Request)  {
	var model models.Model
	decoder.Get(r.Body,&model)
 	err := database.AddModel(model)
 	if err != nil {
 		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create equipment:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}

		return
	}
 	w.WriteHeader(http.StatusOK)
}
