package routes

import (
	"net/http"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"./handlers"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		handlers.Index,
	},
	Route{
		"login",
		"POST",
		"/api/login",
		handlers.Login,
	},
	Route{
		"Users",
		"POST",
		"/api/user",
		handlers.AddUser,
	},
	Route{
		"UserGet",
		"GET",
		"/api/user",
		handlers.GetUsers,
	},
	Route{
		"ProductGet",
		"GET",
		"/api/product/{id}",
		handlers.GetProduct,
	},
	Route{
		"OperationsAdd",
		"POST",
		"/api/operation",
		handlers.AddOperation,
	},
	Route{
		"Operations",
		"GET",
		"/api/operation",
		handlers.GetOperations,
	},
	Route{
		"Equipments",
		"GET",
		"/api/equipment",
		handlers.GetEquipments,
	},
	Route{
		"EquipmentsAdd",
		"POST",
		"/api/equipment",
		handlers.AddEquipment,
	},
	Route{
		"Equipment",
		"GET",
		"/api/equipment/{id}",
		handlers.GetEquipment,
	},
}
func NewRouter() http.Handler {
	router := mux.NewRouter().StrictSlash(true)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // All origins
		AllowedMethods: []string{"GET","POST","PUT","DELETE"},
	})

	for _, route := range routes {
		var handler http.Handler
		handler = route.HandlerFunc
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}

	return c.Handler(router)
}