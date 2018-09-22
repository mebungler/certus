package handlers

/*
func Gets(w http.ResponseWriter, r *http.Request) {
	Get(&models.Operation{})
}
func Get(obj interface{}) func(w http.ResponseWriter, r *http.Request){
	return func (w http.ResponseWriter, r *http.Request){
		object:=database.Get(obj)
		if database.DB.Error!=nil{
			w.WriteHeader(http.StatusBadRequest)
			if err:=json.NewEncoder(w).Encode(Response{Errors:Errors{Global:"Invalid credentials"}}); err!=nil{
				logger.LogErr(err)
				return
			}
			return
		}
		w.WriteHeader(http.StatusOK)
		if err:=json.NewEncoder(w).Encode(struct {

		}{}); err!=nil{
			logger.LogErr(err)
		}
	}
}
*/