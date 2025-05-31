package com.desafio.taskmanager.security;

import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.ext.Provider;
import org.jboss.logging.Logger;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class JWTAuthFilter implements ContainerRequestFilter {

    private static final Logger LOG = Logger.getLogger(JWTAuthFilter.class);

    @Override
    public void filter(ContainerRequestContext requestContext) {
        LOG.debug("Requisição recebida com headers: " + requestContext.getHeaders());
    }
}
