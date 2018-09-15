package database

import (
	"../../logger"
	"../models"
)

//TODO:Use bcrypt to generate password hash

func AddUser(user models.User) error {
	if !DB.HasTable(&user) {
		DB.CreateTable(&user)
	}
	DB.Create(&user)
	if DB.Error!=nil{
		return DB.Error
		logger.LogErr(DB.Error)
	}
	return nil
}

func RemoveUser(id string) error{
	DB.Delete(models.User{ID:id})
	return nil
}

func GetUser(ID string) models.User {
	user:=models.User{}
	DB.Where("ID = ?", ID).First(&user)
	if DB.Error!=nil{
		logger.LogErr(DB.Error)
	}
	return user
}


func GetUserByEmail(login string ) models.User {
	user:=models.User{}
	DB.Where("Email = ?", login).First(&user)
	if DB.Error!=nil{
		logger.LogErr(DB.Error)
	}
	return user
}

func GetAllUsers() ([]models.User,error){
	var usrs []models.User
	DB.Find(&usrs)
	if DB.Error!=nil{
		return nil,DB.Error
		logger.LogErr(DB.Error)
	}
	return usrs,nil
}