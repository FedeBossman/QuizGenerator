import {ActivatedRouteSnapshot, RouteReuseStrategy} from '@angular/router';

/**
 * ReloadRouteReuseStrategy
 * RouteReuseStrategy that overrides shouldReuseRoute to never reuse a component.
 * The rest of logic is maintained as in DefaultReuseStrategy
 */
export class ReloadRouteReuseStrategy implements RouteReuseStrategy {

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, handle: {}): void {
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): {} {
    return null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    // Should only be reused when both route configs are null, this way every time route config exists it recreates the component
    // Default check is future.routeConfig === curr.routeConfig
    return future.routeConfig === null && curr.routeConfig === null;
  }
}
