import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_NAMED_OPTIONS,NamedOptions} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

const uri = 'https://db.buckapi.us:4000'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory: createApollo,
    //   deps: [HttpLink],
    // },
      {
      provide: APOLLO_NAMED_OPTIONS, // <-- Different from standard initialization
      useFactory(httpLink: HttpLink): NamedOptions {
        return {
          default: /* <-- this settings will be saved as default client */ {
            cache: new InMemoryCache(),
            link: httpLink.create({
              uri: 'https://db.buckapi.us:7001',
            }),
          },
          openimport: /* <-- these settings will be saved by name: newClientName */ {
            cache: new InMemoryCache(),
            link: httpLink.create({
              uri: 'https://db.buckapi.us:4004',
            }),
          },
        };
      },
      deps: [HttpLink],
    }
  ],
})
export class GraphQLModule {}
