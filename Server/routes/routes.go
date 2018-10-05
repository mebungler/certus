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
		handlers.GetUser,
	},
	Route{
		"GetByID",
		"GET",
		"/api/user/{id}",
		handlers.GetUser,
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
	Route{
		Name: "CustomerAdd",
		Method: "POST",
		Pattern: "/api/customer",
		HandlerFunc: handlers.AddCustomer,
	},
	Route{
		Name: "GetCustomers",
		Method: "POST",
		Pattern: "/api/customer",
		HandlerFunc: handlers.GetCustomers,
	},
	Route{
		Name: "GetCustomer",
		Method: "Get",
		Pattern: "/api/customer/{id}",
		HandlerFunc: handlers.GetCustomer,
	},
	Route{
		Name: "ModelAdd",
		Method: "POST",
		Pattern: "/api/model",
		HandlerFunc: handlers.AddModel,
	},
	Route{
		Name: "GetModels",
		Method: "Get",
		Pattern: "/api/model",
		HandlerFunc: handlers.GetModels,
	},
	Route{
		Name: "GetModels",
		Method: "Get",
		Pattern: "/api/pre/model",
		HandlerFunc: handlers.GetAllPre,
	},
	Route{
		Name: "GetModel",
		Method: "Get",
		Pattern: "/api/model/{id}",
		HandlerFunc: handlers.GetModel,
	},
	Route{
		Name: "AddTypeClothe",
		Method: "POST",
		Pattern: "/api/type",
		HandlerFunc: handlers.AddType,
	},
	Route{
		Name: "AddOrder",
		Method: "POST",
		Pattern: "/api/order",
		HandlerFunc: handlers.AddOrder,
	},
	Route{
		Name: "GetOrder",
		Method: "Get",
		Pattern: "/api/order/{id}",
		HandlerFunc: handlers.GetOrder,
	},
	Route{
		Name: "GetOrders",
		Method: "Get",
		Pattern: "/api/order",
		HandlerFunc: handlers.GetAllOrders,
	},
	Route {
		Name: "AddPassport",
		Method: "POST",
		Pattern: "/api/passport",
		HandlerFunc: handlers.AddPassport,
	},
	Route {
		Name: "GetPassport",
		Method: "Get",
		Pattern: "/api/passport/{id}",
		HandlerFunc: handlers.GetPassport,
	},
	Route {
		Name: "GetAllPassport",
		Method: "Get",
		Pattern: "/api/passport",
		HandlerFunc: handlers.GetAllPassports,
	},
	Route{
		Name: "AddProperty",
		Method: "POST",
		Pattern: "/api/property",
		HandlerFunc: handlers.AddProperty,

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