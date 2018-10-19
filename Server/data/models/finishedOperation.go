package models

import "time"

type FinishedOperation struct {
	ID        string `gorm:"primary_key" json:"id,omitempty"`
	User      User   `json:"user,omitempty"`
	UserID    string
	Order     Order `json:"order,omitempty"`
	OrderID   string
	Model     Model `json:"model,omitempty"`
	ModelID   string
	CreatedAt time.Time `json:"createdAt,omitempty"`
	UpdatedAt time.Time `json:"updatedAt,omitempty"`
	Time      int       `json:"time,omitempty"`
	Pauses     []Pause   `json:"pauses,omitempty"`
}
