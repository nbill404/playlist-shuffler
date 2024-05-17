import React from "react";

const SidebarPlaylistContext = React.createContext();
export const SidebarProvider = SidebarPlaylistContext.Provider;
export const SidebarConsumer = SidebarPlaylistContext.Consumer;
export default SidebarPlaylistContext;