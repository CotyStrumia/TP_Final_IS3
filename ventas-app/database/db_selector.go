package database

import (
	"os"

	"github.com/gin-gonic/gin"
)

var GetDB func(c *gin.Context) DBHandler = func(c *gin.Context) DBHandler {
	// 1) Determinar entorno actual del servidor
	current := os.Getenv("APP_ENV")
	if os.Getenv("CI") == "true" {
		current = "ci"
	}
	if current == "" {
		current = "qa"
	}

	// 2) Permitir override opcional vía header si existe y está inicializado
	headerEnv := c.GetHeader("X-Env")
	selected := current
	if headerEnv != "" {
		if _, ok := DBs[headerEnv]; ok {
			selected = headerEnv
		}
	}

	db := DBs[selected]
	if db == nil {
		panic("Base de datos no inicializada para entorno: " + selected)
	}
	return &GormDB{DB: db}
}
