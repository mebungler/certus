package database

import (
	"../models"
	"../../logger"
)

func AddAction(action models.ActionOnModel) error {
	if !DB.HasTable(&action) {
		DB.CreateTable(&action)
	}
	DB.Create(&action)
	if DB.Error != nil {
		return DB.Error
		logger.LogErr(DB.Error)
	}
	return nil
}
