package models

type Pause struct {
	Index				    int `gorm:"primary_key" json:"index,omitempty"`
	FinishedOperationID 	string
	Reason 					string `json:"reason,omitempty"`
	Interval 				int `json:"interval,omitempty"`
}
