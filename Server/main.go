package main

import (
	"./data/database"
	"./data/models"
	"./routes"
	"fmt"
	"net/http"
)

func main() {
	database.ConnectAndCreate("sqlite3", "d.db")
	router := routes.NewRouter()
	database.RemoveUser("1234567891011")
	database.AddUser(models.User{Password: "1234", Email: "admin", ID: "1234567891011", Type: 4})
	database.AddEquipment(models.Equipment{ID: "123456789", Brand: "LOL", MachineStatus: "Good", MachineType: "Sewing machine"})
	database.AddProduct(models.Product{ID: "000000111111"})
	database.AddOperation(models.Operation{ID: "2323232", EquipmentID: "123456789", Name: "Dsdasd"})
	database.AddUser(models.User{Password: "123234", Email: "admindd", ID: "123456789101134", Type: 2})
	database.AddUser(models.User{Password: "1213434", Email: "admindsd2d", ID: "12332456789101134", Type: 3})
	database.AddEquipment(models.Equipment{ID: "123456788", Brand: "Dota2", MachineStatus: "Great", MachineType: "Sewingd machine"})
	eq := models.Equipment{ID: "123456788"}
	database.Get(&eq)
	fmt.Println(eq)
	op := []models.Operation{}
	database.Remove(&eq)
	fmt.Println(op)
	database.Add(models.Model{ID: "123231ds34343dd23232s", CodeOfModel: "wwwe232w"})
	customer_1 := []models.Model{}
	database.Add(models.ActionOnModel{ID: "1", OperationID: "2323232", EquipmentID: "123456788", ModelID: "ddddModel111"})
	database.Add(models.ActionOnModel{ID: "2", OperationID: "2323232", EquipmentID: "123456788", ModelID: "ddddModel111"})
	database.Add(models.ActionOnModel{ID: "3", OperationID: "2323232", EquipmentID: "123456788", ModelID: "ddddModel111"})
	database.Add(models.Customer{CustomerName: "Кораблик", ContactNumber: "something", Email: "test@gmail.com", ID: "1112dd"})
	database.Add(models.Model{ID: "ddddModel111", CustomerID: "1112dd", CodeOfModel: "11112233"})
	database.Add(models.Passport{Color: "red", Quantity: 500, Size: 12, CustomerID: "1112dd", ModelID: "ddddModel111", CodeOfPassport: 1, ID: "2323232ddd"})
	database.Add(models.Order{ID: "ddd222", ModelID: "ddddModel111", CustomerID: "1112dd", CodeOfModel: "11112233"})
	database.Add(models.FinishedOperation{ID: "some1", ModelID: "ddddModel111", UserID: "1234", OrderID: "ddd222"})
	database.Add(models.FinishedOperation{ID: "some12", ModelID: "123231ds34343dd23232s", UserID: "123234", OrderID: "ddd222",Time:232})
	database.Add(models.Order{ID:"1xffddfgdgf",Property:[]models.Property{models.Property{Size:123,OrderID:"1xffddfgdgf",Quantity:123,ID:"13312"},models.Property{Size:123,Quantity:123,OrderID:"1xffddfgdgf",ID:"12312312"}}})

	// database.GetAllOperations()
	//	fmt.Println(ddd[0].Equipment.Name)

	//database.RemoveOperation("")
	database.GetAllWithEagerLoading(&customer_1, "Operation")
	fmt.Println(customer_1)
	http.ListenAndServe(":8080", router)
}
