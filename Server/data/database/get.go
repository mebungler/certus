package database

import (
	"reflect"
	"../../logger"
)

func Get(object interface{}) error {
	r := reflect.ValueOf(object)
	f := reflect.Indirect(r).FieldByName("ID")
	id := string(f.String())

	DB.Where("ID = ?", id).First(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}

func GetAll(object interface{}) error{
	DB.Find(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}
func Remove(object interface{}) error {
	DB.Delete(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}
func Add(object interface{}) error {
	if !DB.HasTable(object) {
		DB.CreateTable(object)
	}
	DB.Create(object)
	if DB.Error!=nil{
		logger.LogErr(DB.Error)
		return DB.Error
	}
	return nil
}
func GetAllWithEagerLoading(object interface{},str string) error  {
	DB.Preload(str).Find(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}