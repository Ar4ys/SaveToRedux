import { ZeresLibrary, FaultyVarsChecker } from "./../dependency-related"
export { ZeresLibrary }
export const { BdApi, XenoLib, require } = global
export const Electron = require("electron")
export const FsModule = require('fs')
export const RequestModule = require('request')
export const PathModule = require('path')
export const MimeTypesModule = require('mime-types')
export const { React } = ZeresLibrary.DiscordModules

FaultyVarsChecker.checkVars({
	ZeresLibrary,
	BdApi,
	XenoLib,
	Electron,
	FsModule,
	RequestModule,
	PathModule,
	MimeTypesModule,
	React,
})
