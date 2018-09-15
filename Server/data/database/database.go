package database

import (
	"../../data/models"
	"../../logger"
	"github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/sqlite"
)

var DB *gorm.DB


func ConnectAndCreate(databaseType,connectionString string) {
	var err error
	DB, err = gorm.Open(databaseType,connectionString)
	if err != nil {
		logger.LogErr(err)
	}
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Operation{})
	DB.AutoMigrate(&models.Product{})
	DB.AutoMigrate(&models.Equipment{})
	DB.LogMode(true)
}

func Close(){
	DB.Close()
}
