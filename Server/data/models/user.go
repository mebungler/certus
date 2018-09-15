package models

type User struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	FirstName string `json:"firstName,omitempty"`
	LastName string `json:"lastName,omitempty"`
	Type int `json:"type,omitempty"`
	Email string `json:"email,omitempty"`
	Password string `json:"password,omitempty"`
	CreatedAt int `json:"createdAt,omitempty"`
	Priority int `json:"priority,omitempty"`
	Photo string `json:"photo,omitempty"`
}

