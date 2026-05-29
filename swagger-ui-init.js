window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Cats API",
      "version": "1.0.0"
    },
    "paths": {
      "/cats/add": {
        "post": {
          "description": "Добавление списка имен",
          "produces": [
            "application/json"
          ],
          "requestBody": {
            "description": "Список с именами и полом",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "cats": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "description": "Имя кота",
                            "type": "string",
                            "required": true
                          },
                          "gender": {
                            "$ref": "#/definitions/GenderEnum"
                          },
                          "description": {
                            "description": "Описание кота",
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Список добавленных котов",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "cats": {
                        "type": "array",
                        "items": {
                          "$ref": "#/definitions/Cat"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/cats/get-by-id": {
        "get": {
          "description": "Получение кота по id",
          "parameters": [
            {
              "in": "query",
              "name": "id",
              "schema": {
                "type": "number"
              },
              "required": true,
              "description": "Id кота"
            }
          ],
          "responses": {
            "200": {
              "description": "Объект кота",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "cat": {
                        "$ref": "#/definitions/Cat"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/cats/search": {
        "post": {
          "description": "Поиск по имени и доп.характеристикам",
          "produces": [
            "application/json"
          ],
          "requestBody": {
            "description": "Фильтр поиска имени",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "description": "Имя кота",
                      "type": "string",
                      "required": true
                    },
                    "gender": {
                      "$ref": "#/definitions/GenderEnum"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Имена по группам алфавита с их количеством",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/definitions/Groups"
                  }
                }
              }
            }
          }
        }
      },
      "/cats/search-pattern": {
        "get": {
          "description": "Поиск по части начала имени",
          "parameters": [
            {
              "in": "query",
              "name": "name",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Часть начала имени"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "number"
              },
              "description": "Ограничение вывода количества имен"
            }
          ],
          "responses": {
            "200": {
              "description": "список имен",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "moreResults": {
                        "type": "boolean"
                      },
                      "cats": {
                        "type": "array",
                        "items": {
                          "$ref": "#/definitions/Cat"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/cats/save-description": {
        "post": {
          "description": "Сохранение описания имени",
          "produces": [
            "application/json"
          ],
          "requestBody": {
            "description": "Фильтр поиска имени",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "catId": {
                      "description": "id кота",
                      "type": "number",
                      "required": true
                    },
                    "catDescription": {
                      "description": "Описание имени",
                      "type": "string",
                      "required": true
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Имена по группам алфавита с их количеством",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/definitions/Cat"
                  }
                }
              }
            }
          }
        }
      },
      "/cats/validation": {
        "get": {
          "description": "Получение правил валидации",
          "responses": {
            "200": {
              "description": "список регулярных выражений",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number"
                        },
                        "description": {
                          "type": "string"
                        },
                        "regex": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/cats/all": {
        "get": {
          "description": "Вывод списка всех котов",
          "parameters": [
            {
              "in": "query",
              "name": "order",
              "schema": {
                "type": "string",
                "enum": [
                  "asc",
                  "desc"
                ]
              },
              "required": true,
              "description": "Id кота"
            },
            {
              "in": "query",
              "name": "gender",
              "schema": {
                "$ref": "#/definitions/GenderEnum"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "список имен",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/definitions/Groups"
                  }
                }
              }
            }
          }
        }
      },
      "/cats/{catId}/upload": {
        "post": {
          "description": "Добавление изображения кота",
          "parameters": [
            {
              "in": "path",
              "name": "catId",
              "schema": {
                "type": "integer"
              },
              "required": true,
              "description": "Id кота"
            }
          ],
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "file": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Имя загруженного изображения",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "fileUrl": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/cats/{catId}/photos": {
        "get": {
          "description": "Получение изображений по id кота",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "catId",
              "schema": {
                "type": "integer"
              },
              "required": true,
              "description": "Id кота"
            }
          ],
          "responses": {
            "200": {
              "description": "список фотографий кота",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "images": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/version": {
        "get": {
          "description": "Получение версии проекта",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "версия проекта",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "build": {
                        "type": "number"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/cats/{catId}/like": {
        "post": {
          "description": "Добавление лайка коту",
          "parameters": [
            {
              "in": "path",
              "name": "catId",
              "schema": {
                "type": "integer"
              },
              "required": true,
              "description": "Id кота"
            }
          ],
          "responses": {
            "200": {
              "content": {
                "text/plain": {
                  "schema": {
                    "type": "string",
                    "example": "OK"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "description": "Удаление лайка у кота",
          "parameters": [
            {
              "in": "path",
              "name": "catId",
              "schema": {
                "type": "integer"
              },
              "required": true,
              "description": "Id кота"
            }
          ],
          "responses": {
            "200": {
              "content": {
                "text/plain": {
                  "schema": {
                    "type": "string",
                    "example": "OK"
                  }
                }
              }
            }
          }
        }
      },
      "/cats/{catId}/remove": {
        "delete": {
          "description": "Удаления кота",
          "parameters": [
            {
              "in": "path",
              "name": "catId",
              "schema": {
                "type": "integer"
              },
              "required": true,
              "description": "Id кота"
            }
          ],
          "responses": {
            "200": {
              "content": {
                "text/plain": {
                  "schema": {
                    "type": "string",
                    "example": "OK"
                  }
                }
              }
            }
          }
        }
      },
      "/cats/{catId}/dislike": {
        "post": {
          "description": "Добавление дизлайка коту",
          "parameters": [
            {
              "in": "path",
              "name": "catId",
              "schema": {
                "type": "integer"
              },
              "required": true,
              "description": "Id кота"
            }
          ],
          "responses": {
            "200": {
              "content": {
                "text/plain": {
                  "schema": {
                    "type": "string",
                    "example": "OK"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "description": "Удаление дизлайка у кота",
          "parameters": [
            {
              "in": "path",
              "name": "catId",
              "schema": {
                "type": "integer"
              },
              "required": true,
              "description": "Id кота"
            }
          ],
          "responses": {
            "200": {
              "content": {
                "text/plain": {
                  "schema": {
                    "type": "string",
                    "example": "OK"
                  }
                }
              }
            }
          }
        }
      },
      "/cats/likes-rating": {
        "get": {
          "description": "Получение списка ТОП-10 лайков",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "список имен с лайками",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "require": true
                        },
                        "likes": {
                          "type": "number",
                          "require": true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/cats/dislikes-rating": {
        "get": {
          "description": "Получение списка ТОП-10 дизлайков",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "список имен с дизлайками",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "require": true
                        },
                        "dislikes": {
                          "type": "number",
                          "require": true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/core/cats/search": {
        "post": {
          "description": "Мобильный поиск котов по имени, сортировке и полу.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "order": {
                      "type": "string",
                      "enum": [
                        "asc",
                        "desc"
                      ]
                    },
                    "gender": {
                      "$ref": "#/definitions/GenderEnum"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Группы котов для мобильного приложения."
            }
          }
        }
      },
      "/api/core/cats/add": {
        "post": {
          "description": "Мобильное добавление одного или нескольких котов.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "cats": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string"
                          },
                          "gender": {
                            "$ref": "#/definitions/GenderEnum"
                          },
                          "description": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Добавленные коты или бизнес-ошибка в errorDescription."
            }
          }
        }
      },
      "/api/core/cats/get-by-id": {
        "get": {
          "description": "Мобильное получение кота по id.",
          "parameters": [
            {
              "in": "query",
              "name": "id",
              "schema": {
                "type": "number"
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Объект cat."
            }
          }
        }
      },
      "/api/core/cats/save-description": {
        "post": {
          "description": "Мобильное сохранение описания кота.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "catId": {
                      "type": "number"
                    },
                    "catDescription": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Обновленный cat."
            }
          }
        }
      },
      "/api/likes/cats/rating": {
        "get": {
          "description": "Мобильный рейтинг по лайкам и дизлайкам.",
          "responses": {
            "200": {
              "description": "Объект с массивами likes и dislikes."
            }
          }
        }
      },
      "/api/likes/cats/{catId}/likes": {
        "post": {
          "description": "Мобильное голосование за кота.",
          "parameters": [
            {
              "in": "path",
              "name": "catId",
              "schema": {
                "type": "integer"
              },
              "required": true
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "like": {
                      "type": "boolean"
                    },
                    "dislike": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Обновленный cat."
            }
          }
        }
      },
      "/api/photos/cats/{catId}/photos": {
        "get": {
          "description": "Мобильный список фотографий кота.",
          "parameters": [
            {
              "in": "path",
              "name": "catId",
              "schema": {
                "type": "integer"
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Массив относительных ссылок images."
            }
          }
        }
      },
      "/api/photos/cats/{catId}/upload": {
        "post": {
          "description": "Мобильная загрузка фотографии кота.",
          "parameters": [
            {
              "in": "path",
              "name": "catId",
              "schema": {
                "type": "integer"
              },
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "file": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Относительная ссылка fileUrl."
            }
          }
        }
      }
    },
    "definitions": {
      "GenderEnum": {
        "type": "string",
        "required": true,
        "description": "Пол кота",
        "enum": [
          "male",
          "female",
          "unisex"
        ]
      },
      "Cat": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "required": true
          },
          "name": {
            "type": "string",
            "description": "Имя кота",
            "required": true
          },
          "description": {
            "type": "string",
            "description": "Описание имени кота"
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "gender": {
            "$ref": "#/definitions/GenderEnum"
          },
          "likes": {
            "type": "number",
            "description": "Количество лайков у имени",
            "required": true
          },
          "dislikes": {
            "type": "number",
            "description": "Количество дизлайков у имени",
            "required": true
          }
        }
      },
      "Groups": {
        "type": "object",
        "properties": {
          "groups": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "title": {
                  "type": "string",
                  "description": "Заголовок группы имён (первая буква имени)",
                  "required": true
                },
                "count": {
                  "type": "number",
                  "description": "Количество имён в группе",
                  "required": true
                },
                "cats": {
                  "type": "array",
                  "required": true,
                  "items": {
                    "$ref": "#/definitions/Cat"
                  }
                }
              }
            }
          }
        }
      }
    },
    "components": {},
    "tags": []
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}