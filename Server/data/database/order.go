package database


func GetCurrentOrders(object interface{}) error {
	DB.Where("ReadyForCutting = ? ",true).Find(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}
