package handlers

import (
	"../../data/database"
	"../../logger"
	"encoding/json"
	"net/http"
	"../../data/models"
	"../../decoder"
)

func AddPause(w http.ResponseWriter , r *http.Request)  {
	var pause models.Pause
	decoder.Get(r.Body, &pause)
	err := database.Add(pause)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create pause:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}
