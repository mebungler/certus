package routes

import (
	"./handlers"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"net/http"
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
		Name:        "CustomerAdd",
		Method:      "POST",
		Pattern:     "/api/customer",
		HandlerFunc: handlers.AddCustomer,
	},
	Route{
		Name:        "GetCustomers",
		Method:      "GET",
		Pattern:     "/api/customer",
		HandlerFunc: handlers.GetCustomers,
	},
	Route{
		Name:        "GetCustomer",
		Method:      "Get",
		Pattern:     "/api/customer/{id}",
		HandlerFunc: handlers.GetCustomer,
	},
	Route{
		Name:        "ModelAdd",
		Method:      "POST",
		Pattern:     "/api/model",
		HandlerFunc: handlers.AddModel,
	},
	Route{
		Name:        "GetModels",
		Method:      "Get",
		Pattern:     "/api/model",
		HandlerFunc: handlers.GetModels,
	},
	Route{
		Name:        "GetModels",
		Method:      "Get",
		Pattern:     "/api/pre/model",
		HandlerFunc: handlers.GetAllPre,
	},
	Route{
		Name:        "GetModel",
		Method:      "Get",
		Pattern:     "/api/model/{id}",
		HandlerFunc: handlers.GetModel,
	},
	Route{
		Name:        "AddTypeClothe",
		Method:      "POST",
		Pattern:     "/api/type",
		HandlerFunc: handlers.AddType,
	},
	Route{
		Name:        "AddOrder",
		Method:      "POST",
		Pattern:     "/api/order",
		HandlerFunc: handlers.AddOrder,
	},
	Route{
		Name:        "GetOrder",
		Method:      "Get",
		Pattern:     "/api/order/{id}",
		HandlerFunc: handlers.GetOrder,
	},
	Route{
		Name:        "GetOrders",
		Method:      "Get",
		Pattern:     "/api/order",
		HandlerFunc: handlers.GetAllOrders,
	},
	Route{
		Name:        "GetReadyOrders",
		Method:      "Get",
		Pattern:     "/api/order",
		HandlerFunc: handlers.GetCurrentOrders,
	},
	Route{
		Name:        "AddPassport",
		Method:      "POST",
		Pattern:     "/api/passport",
		HandlerFunc: handlers.AddPassport,
	},
	Route{
		Name:        "GetPassport",
		Method:      "Get",
		Pattern:     "/api/passport/{id}",
		HandlerFunc: handlers.GetPassport,
	},
	Route{
		Name:        "GetAllPassport",
		Method:      "Get",
		Pattern:     "/api/passport",
		HandlerFunc: handlers.GetAllPassports,
	},
	Route{
		Name:        "AddProperty",
		Method:      "POST",
		Pattern:     "/api/property",
		HandlerFunc: handlers.AddProperty,
	},
	Route{
		Name:        "GetPassports",
		Method:      "Get",
		Pattern:     "/api/pre/passports/{component}",
		HandlerFunc: handlers.GetAllPrePassports,
	},
	Route{
		Name:        "GetOrders",
		Method:      "Get",
		Pattern:     "/api/pre/order",
		HandlerFunc: handlers.GetAllPreOrder,
	},
	Route{
		Name:        "GetOperations",
		Method:      "Get",
		Pattern:     "/api/pre/operation/{component}",
		HandlerFunc: handlers.GetAllPreOperation,
	},
	Route{
		Name:        "AddFinishedOperation",
		Method:      "POST",
		Pattern:     "/api/finishedoperation",
		HandlerFunc: handlers.AddFinOperation,
	},
	Route{
		Name:        "GetFinishedOperation",
		Method:      "Get",
		Pattern:     "/api/finishedoperation/{id}",
		HandlerFunc: handlers.GetFinishedOperation,
	},
	Route{
		Name:        "GetFinishedOperations",
		Method:      "Get",
		Pattern:     "/api/finishedoperation",
		HandlerFunc: handlers.GetAllFinishedOperations,
	},
	Route{
		Name:        "GetPreFinOperations",
		Method:      "Get",
		Pattern:     "/api/pre/finishedoperation/{component}",
		HandlerFunc: handlers.GetAllPreFinishedOperations,
	},
	Route{
		Name:        "GetOnePrePassport",
		Method:      "Get",
		Pattern:     "/api/pre/passport/{component}",
		HandlerFunc: handlers.GetOnePrePassport,
	},
	Route{
		Name:        "AddPause",
		Method:      "POST",
		Pattern:     "/api/pause",
		HandlerFunc: handlers.AddPause,
	},

	Route{
		Name:        "AddTechnology",
		Method:      "POST",
		Pattern:     "/api/technology",
		HandlerFunc: handlers.AddTechnology,
	},

	Route{
		Name:        "GetTechnology",
		Method:      "Get",
		Pattern:     "/api/technology/{id}",
		HandlerFunc: handlers.GetTechnology,
	},

	Route{
		Name:        "GetAllTechnologies",
		Method:      "Get",
		Pattern:     "/api/technology",
		HandlerFunc: handlers.GetAllTechnologies,
	},

	Route{
		Name:        "UpdateUser",
		Method:      "PUT",
		Pattern:     "/api/user",
		HandlerFunc: handlers.UpdateUser,
	},

	Route{
		Name:        "RemoveUser",
		Method:      "DELETE",
		Pattern:     "/api/user/{id}",
		HandlerFunc: handlers.RemoveUser,
	},

	Route{
		Name:        "UpdateTechnology",
		Method:      "PUT",
		Pattern:     "/api/technology",
		HandlerFunc: handlers.UpdateTechnology,
	},

	Route{
		Name:        "RemoveTechnology",
		Method:      "DELETE",
		Pattern:     "/api/technology/{id}",
		HandlerFunc: handlers.RemoveTechnology,
	},


	Route{
		Name:        "UpdateProperty",
		Method:      "PUT",
		Pattern:     "/api/property",
		HandlerFunc: handlers.UpdateProperty,
	},

	Route{
		Name:        "RemoveProperty",
		Method:      "DELETE",
		Pattern:     "/api/property/{id}",
		HandlerFunc: handlers.RemoveProperty,
	},

	Route{
		Name:        "UpdateProduct",
		Method:      "PUT",
		Pattern:     "/api/product",
		HandlerFunc: handlers.UpdateProduct,
	},

	Route{
		Name:        "RemoveProduct",
		Method:      "DELETE",
		Pattern:     "/api/product/{id}",
		HandlerFunc: handlers.RemoveProduct,
	},

	Route{
		Name:        "UpdatePassport",
		Method:      "PUT",
		Pattern:     "/api/passport",
		HandlerFunc: handlers.UpdatePassport,
	},

	Route{
		Name:        "RemovePassport",
		Method:      "DELETE",
		Pattern:     "/api/passport/{id}",
		HandlerFunc: handlers.RemovePassport,
	},

	Route{
		Name:        "UpdateOrder",
		Method:      "PUT",
		Pattern:     "/api/order",
		HandlerFunc: handlers.UpdateOrder,
	},

	Route{
		Name:        "RemoveOrder",
		Method:      "DELETE",
		Pattern:     "/api/order/{id}",
		HandlerFunc: handlers.RemoveOrder,
	},

	Route{
		Name:        "UpdateOperation",
		Method:      "PUT",
		Pattern:     "/api/opertion",
		HandlerFunc: handlers.UpdateOperation,
	},

	Route{
		Name:        "RemoveOperation",
		Method:      "DELETE",
		Pattern:     "/api/opertion/{id}",
		HandlerFunc: handlers.RemoveOperation,
	},

	Route{
		Name:        "UpdateModel",
		Method:      "PUT",
		Pattern:     "/api/model",
		HandlerFunc: handlers.UpdateModel,
	},

	Route{
		Name:        "RemoveModel",
		Method:      "DELETE",
		Pattern:     "/api/model/{id}",
		HandlerFunc: handlers.RemoveModel,
	},

	Route{
		Name:        "UpdateFinishedOperation",
		Method:      "PUT",
		Pattern:     "/api/finishedOperation",
		HandlerFunc: handlers.UpdateFinishedOperation,
	},

	Route{
		Name:        "RemoveFinishedOperation",
		Method:      "DELETE",
		Pattern:     "/api/finishedOperation/{id}",
		HandlerFunc: handlers.RemoveFinshedOperation,
	},

	Route{
		Name:        "UpdateEquipment",
		Method:      "PUT",
		Pattern:     "/api/equipment",
		HandlerFunc: handlers.UpdateEquipment,
	},

	Route{
		Name:        "RemoveEquipment",
		Method:      "DELETE",
		Pattern:     "/api/equipment/{id}",
		HandlerFunc: handlers.RemoveEquipment,
	},

	Route{
		Name:        "UpdateCustomer",
		Method:      "PUT",
		Pattern:     "/api/customer",
		HandlerFunc: handlers.UpdateCustomer,
	},

	Route{
		Name:        "RemoveCustomer",
		Method:      "DELETE",
		Pattern:     "/api/customer/{id}",
		HandlerFunc: handlers.RemoveCustomer,
	},

	Route{
		Name:        "UpdateTypeClothe",
		Method:      "PUT",
		Pattern:     "/api/type",
		HandlerFunc: handlers.UpdateClotheType,
	},

	Route{
		Name:        "RemoveCustomer",
		Method:      "DELETE",
		Pattern:     "/api/type/{id}",
		HandlerFunc: handlers.RemoveClotheType,
	},

	Route{
		Name:        "UpdateTypeClothe",
		Method:      "PUT",
		Pattern:     "/api/type",
		HandlerFunc: handlers.UpdateClotheType,
	},

	Route{
		Name:        "RemoveCustomer",
		Method:      "DELETE",
		Pattern:     "/api/type/{id}",
		HandlerFunc: handlers.RemoveClotheType,
	},
	Route{
    Name:        "GetPorperties",
    Method:      "Get",
    Pattern:     "/api/property",
    HandlerFunc: handlers.GetAllProperties,
  },
}


func NewRouter() http.Handler {
	router := mux.NewRouter().StrictSlash(true)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // All origins
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
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
