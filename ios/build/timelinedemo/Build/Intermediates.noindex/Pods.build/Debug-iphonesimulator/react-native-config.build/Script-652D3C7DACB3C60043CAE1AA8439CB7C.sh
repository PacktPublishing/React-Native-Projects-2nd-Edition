#!/bin/sh

set -ex
HOST_PATH="$SRCROOT/../.."
"${PODS_TARGET_SRCROOT}/ios/ReactNativeConfig/BuildDotenvConfig.rb" "$HOST_PATH" "${PODS_TARGET_SRCROOT}/ios/ReactNativeConfig"

