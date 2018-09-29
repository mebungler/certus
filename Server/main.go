package main

import (
	"./data/database"
	"./data/models"
	"./routes"
	"fmt"
	"net/http"
)

func main() {
	database.ConnectAndCreate("sqlite3","d.db")
	router:=routes.NewRouter()
	database.RemoveUser("1234567891011")
	database.AddUser(models.User{Password:"1234",Email:"admin",ID:"1234567891011",Type:4})
	database.AddEquipment(models.Equipment{ID:"123456789",Brand:"LOL",MachineStatus:"Good",MachineType:"Sewing machine"})
	database.AddProduct(models.Product{ID:"000000111111"})
	database.AddOperation(models.Operation{ID:"2323232",EquipmentID:"123456789",Name:"Dsdasd",ProductID:"000000111111"})
	database.AddUser(models.User{Password:"123234",Email:"admindd",ID:"123456789101134",Type:2})
	database.AddUser(models.User{Password:"1213434",Email:"admindsd2d",ID:"12332456789101134",Type:3})
	database.AddEquipment(models.Equipment{ID:"123456788",Brand:"Dota2",MachineStatus:"Great",MachineType:"Sewingd machine"})
	eq := models.Equipment{ID:"123456788"}
	database.Get(&eq)
	fmt.Println(eq)
	op := []models.Operation{}
	database.Remove(&eq)
	fmt.Println(op)
	database.Add(models.Model{ID:"123231ds34343dd23232s",CodeOfModel:"wwwe232w"})
	customer_1 := []models.Model{}
	// database.GetAllOperations()
//	fmt.Println(ddd[0].Equipment.Name)

	//database.RemoveOperation("")
	database.GetAllWithEagerLoading(&customer_1,"Operation")
		fmt.Println(customer_1)
	http.ListenAndServe(":8080",router)
}
