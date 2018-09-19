package database

import "../models"
import "../../logger"
func AddCustomer(customer models.Customer) error {
	if !DB.HasTable(&customer) {
		DB.CreateTable(&customer)
	}
	DB.Create(&customer)
	if DB.Error!=nil{
		logger.LogErr(DB.Error)
		return DB.Error
	}
	return nil
}

func GetCustomer(ID string) (models.Customer,error) {
	customer :=models.Customer{}
	DB.Where("ID = ?",ID).First(&customer)
	if DB.Error!=nil{
		return models.Customer{},DB.Error
		logger.LogErr(DB.Error)
	}
	return customer,nil
}

func GetCustomers() ([]models.Customer,error) {
	var customers []models.Customer
	DB.Find(&customers)
	if DB.Error!=nil{
		return []models.Customer{},DB.Error
		logger.LogErr(DB.Error)
	}
	return customers,nil
}
func DeleteCustomer(id string) error  {
	DB.Delete(models.Customer{ID:id})
	if DB.Error!=nil{
		logger.LogErr(DB.Error)
		return DB.Error
	}
	return nil
}