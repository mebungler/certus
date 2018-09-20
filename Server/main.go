package main

import (
	"./data/models"
	"./routes"
	"./data/database"
	"net/http"
)

func main() {
	database.ConnectAndCreate("sqlite3","d.db")
	router:=routes.NewRouter()
	database.RemoveUser("1234567891011")
	database.AddUser(models.User{Password:"1234",Email:"admin",ID:"1234567891011",Type:4})
	database.AddEquipment(models.Equipment{ID:"123456789",Brand:"LOL",MachineStatus:"Good",MachineType:"Sewing machine"})
	database.AddProduct(models.Product{ID:"000000111111"})
	database.RemoveOperation("")

	http.ListenAndServe(":8080",router)
}
