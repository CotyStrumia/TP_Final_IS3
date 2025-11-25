package main

import (
	"fmt"
	"os"
	"ventas-app/config"
	"ventas-app/database"
	"ventas-app/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	// Detectar entorno
	env := os.Getenv("APP_ENV")

	// Si es CI → forzar entorno de pruebas
	if os.Getenv("CI") == "true" {
		env = "ci"
	}

	// Si no viene nada, asumimos QA (Render QA)
	if env == "" {
		env = "qa"
	}

	fmt.Println("Iniciando backend en entorno:", env)

	// Cargar variables según entorno
	config.LoadEnv(env)

	// Conectar BD
	database.Connect()

	// Iniciar servidor
	r := gin.Default()

	fmt.Println("Conexión establecida para:", env)

	// ================
	//   🔥 CORS FIX
	// ================
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			// FRONT LOCALES (para Vite y Cypress)
			"http://localhost:5173",
			"http://localhost:5174",

			// FRONT QA y PROD (Render)
			"https://frontqa-t0a9.onrender.com",
			"https://frontprod-uu5g.onrender.com",
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Rutas
	routes.Setup(r)

	// Puerto fijo (Render usa ese puerto)
	r.Run(":8080")
}
