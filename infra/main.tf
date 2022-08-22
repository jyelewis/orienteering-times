terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

provider "aws" {
  region = local.AWS.AWS_DEFAULT_REGION
}

# constants
locals {
  CONTAINER_ENV = [
    "AWS_ACCESS_KEY_ID=${local.AWS.AWS_ACCESS_KEY_ID}",
    "AWS_SECRET_ACCESS_KEY=${local.AWS.AWS_SECRET_ACCESS_KEY}",
    "AWS_DEFAULT_REGION=${local.AWS.AWS_DEFAULT_REGION}"
  ]
}

# shared network for all microservices
resource "docker_network" "network" {
  name = "app_network"
}

resource "docker_image" "node" {
  name = "node:14"
  keep_locally = true
}

resource "docker_container" "my-app" {
  image = docker_image.node.latest
  name = "my-app"
  #ports {
  #  internal = 80
  #  external = 8000
  #}
  volumes {
    host_path = local.APP_CODE_ROOT
    container_path = "/app"
  }
  networks_advanced {
    name = docker_network.network.name
  }
  env = concat(local.CONTAINER_ENV, [
    #"REDIS_URL=redis://${docker_container.my-app_redis.hostname}/"
  ])
  working_dir = "/app"
  command = ["yarn", "start"]
}


