import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './features/core/home/home.component';
import {ShopComponent} from './features/shop/shop.component';
import {AccountPageComponent} from './features/account/account-page.component';
import {StoryListComponent} from './features/stories/story-list/story-list.component';
import {TradeInRequestPageComponent} from './features/trade-in-requests/trade-in-request-page.component';
import {TradeInRequestJewelryTypeComponent} from './features/trade-in-requests/trade-in-request-jewelry-type/trade-in-request-jewelry-type.component';
import {TradeInRequestJewelryMaterialComponent} from './features/trade-in-requests/trade-in-request-jewelry-material/trade-in-request-jewelry-material.component';
import {AdminComponent} from './admin/admin.component';
import {AdminProductsOverviewComponent} from './admin/features/products/admin-products-overview/admin-products-overview.component';
import {AdminStoriesOverviewComponent} from './admin/features/stories/admin-stories-overview/admin-stories-overview.component';
import {AdminTradeInRequestOverviewComponent} from './admin/features/trade-in-requests/admin-trade-in-request-overview/admin-trade-in-request-overview.component';
import {AdminCreditIndicationsOverviewComponent} from './admin/features/credit-indications/admin-credit-indications-overview/admin-credit-indications-overview.component';
import {AdminPermissionsOverviewComponent} from './admin/features/permissions/admin-permissions-overview/admin-permissions-overview.component';
import {AllTradeInRequestsResolver} from './shared/services/trade-in/resolvers/all-trade-in-requests.resolver';
import {AdminTradeInRequestEditComponent} from './admin/features/trade-in-requests/admin-trade-in-request-edit/admin-trade-in-request-edit.component';
import {TradeInRequestResolver} from './shared/services/trade-in/resolvers/trade-in-request.resolver';
import {TradeInRequestJewelrySelectionComponent} from './features/trade-in-requests/trade-in-request-jewelry-selection/trade-in-request-jewelry-selection.component';
import {TradeInRequestFinalizationComponent} from './features/trade-in-requests/trade-in-request-finalization/trade-in-request-finalization.component';
import {TradeInRequestJewelryConditionComponent} from './features/trade-in-requests/trade-in-request-jewelry-condition/trade-in-request-jewelry-condition.component';
import {TradeInRequestCreditIndicationComponent} from './features/trade-in-requests/trade-in-request-credit-indication/trade-in-request-credit-indication.component';
import {TradeInRequestOverviewComponent} from './features/trade-in-requests/trade-in-request-overview/trade-in-request-overview.component';
import {AllProductsResolver} from './shared/services/product/all-products.resolver';
import {TradeInRequestCompletionComponent} from './features/trade-in-requests/trade-in-request-completion/trade-in-request-completion.component';
import {ProductResolver} from './shared/services/product/product.resolver';
import {ShoppingCartComponent} from './features/shop/cart/shopping-cart.component';
import {ShopListComponent} from './features/shop/shop-list/shop-list.component';
import {ShopProductDetailsComponent} from './features/shop/shop-detail/shop-product-details.component';
import {AdminProductEditComponent} from './admin/features/products/admin-product-edit/admin-product-edit.components';
import {LoginComponent} from './features/auth/login/login.component';
import {AllProductRatingsResolver} from './shared/services/product/all-product-ratings.resolver';
import {AllProductCategoriesResolver} from './shared/services/product/all-product-categories.resolver';
import {LogoutComponent} from './features/auth/logout/logout.component';
import {ErrorPageComponent} from './shared/components/error-page/error-page.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {PermissionGuard} from './features/auth/permission.guard';
import {OrderHistoryOverviewComponent} from './features/account/features/order-history/order-history-overview/order-history-overview.component';
import {TradeInHistoryOverviewComponent} from './features/account/features/trade-in-history/trade-in-history-overview/trade-in-history-overview.component';
import {UserTradeInRequestsResolver} from './shared/services/trade-in/resolvers/user-trade-in-requests.resolver';
import {LoginGuard} from './features/auth/login.guard';
import {AdminProductCreateComponent} from './admin/features/products/admin-product-create/admin-product-create.component';
import {AdminStoriesEditComponent} from './admin/features/stories/admin-stories-edit/admin-stories-edit.component';
import {AllStoriesResolver} from './shared/services/stories/all-stories.resolver';
import {StoryResolver} from './shared/services/stories/story.resolver';
import {AvailableProductsResolver} from './features/shop/available-products.resolver';
import {AllPublishedStoriesResolver} from './shared/services/stories/all-published-stories.resolver';
import {NewStoryComponent} from './features/stories/new-story/new-story.component';
import {StoriesComponent} from './features/stories/stories.component';
import {AllProductWithoutStoryResolver} from './shared/services/product/all-product-without-story.resolver';
import {WithoutProductsStoriesResolver} from './shared/services/stories/without-products-stories.resolver';
import {UserDataResolverGuard} from './shared/services/auth/user-data-resolver.service';
import {TradeInProcessStateGuard} from './features/trade-in-requests/trade-in-process-state-guard.service';
import {CheckoutComponent} from './features/shop/checkout/checkout.component';
import {CheckoutCompletionComponent} from './features/shop/checkout/completion/checkout-completion.component';
import {ProductEditResolver} from './shared/services/product/product.edit.resolver';
import {InvoiceResolver} from './shared/services/invoices/invoice.resolver';

const routes: Routes = [
    {
        path: '', canActivate: [UserDataResolverGuard],
        children: [
            {path: '', component: HomeComponent},
            {
                path: 'shop',
                component: ShopComponent,
                resolve: {products: AvailableProductsResolver},
                children: [
                    {path: '', component: ShopListComponent},
                    {path: 'product/:id', component: ShopProductDetailsComponent, resolve: {product: ProductResolver}},
                    {path: 'cart', component: ShoppingCartComponent},
                    {path: 'checkout', component: CheckoutComponent,  canActivate: [LoginGuard]},
                    {path: 'checkout/complete', component: CheckoutCompletionComponent,  canActivate: [LoginGuard]},
                ]
            },
            {path: 'trade-in', redirectTo: 'trade-in/type', pathMatch: 'full'},
            {
                path: 'trade-in',
                component: TradeInRequestPageComponent,
                canActivate: [TradeInProcessStateGuard],
                children: [
                    {path: 'type', component: TradeInRequestJewelryTypeComponent, data: {animation: 'jewelryType'}},
                    {path: 'material', component: TradeInRequestJewelryMaterialComponent, data: {animation: 'jewelryMaterial'}},
                    {path: 'piece', component: TradeInRequestJewelrySelectionComponent, data: {animation: 'jewelryPiece'}},
                    {path: 'condition', component: TradeInRequestJewelryConditionComponent, data: {animation: 'jewelryConditions'}},
                    {path: 'indication', component: TradeInRequestCreditIndicationComponent, data: {animation: 'jewelryIndication'}},
                    {path: 'overview', component: TradeInRequestOverviewComponent, data: {animation: 'jewelryOverview'}},
                    {
                        path: 'finalize',
                        component: TradeInRequestFinalizationComponent,
                        data: {animation: 'jewelryFinalization'},
                        canActivate: [LoginGuard]
                    },
                    {path: 'complete', component: TradeInRequestCompletionComponent, data: {animation: 'jewelryCompletion'}},
                ]
            },
            {
                path: 'stories', component: StoriesComponent, children: [
                    {path: '', component: StoryListComponent, resolve: {stories: AllPublishedStoriesResolver},},
                    {path: 'new', component: NewStoryComponent, canActivate: [LoginGuard]},
                ]
            },
            {path: 'register', component: RegisterComponent},
            {path: 'login', component: LoginComponent},
            {path: 'logout', component: LogoutComponent},
            {
                path: 'account', component: AccountPageComponent, canActivate: [LoginGuard], children: [
                    {path: '', redirectTo: '/account/order-history', pathMatch: 'full'},
                    {
                        path: 'order-history',
                        component: OrderHistoryOverviewComponent,
                        resolve: {orders: InvoiceResolver}},
                    {
                        path: 'trade-in-history',
                        component: TradeInHistoryOverviewComponent,
                        resolve: {requests: UserTradeInRequestsResolver}
                    },
                ]
            },
            {
                path: 'admin', component: AdminComponent, canActivate: [PermissionGuard], data: {permissionLevel: 1}, children: [
                    {path: '', redirectTo: '/admin/trade-in', pathMatch: 'full'},
                    {
                        path: 'products',
                        component: AdminProductsOverviewComponent,
                        canActivate: [PermissionGuard],
                        data: {permissionLevel: 2},
                        resolve: {products: AllProductsResolver}
                    },
                    {
                        path: 'products/edit/:id',
                        component: AdminProductEditComponent,
                        canActivate: [PermissionGuard],
                        data: {permissionLevel: 2},
                        resolve: {
                            product: ProductEditResolver,
                            productCategories: AllProductCategoriesResolver,
                            productRatings: AllProductRatingsResolver,
                            stories: WithoutProductsStoriesResolver,
                        }
                    },
                    {
                        path: 'products/create', component: AdminProductCreateComponent,
                        resolve: {
                            productCategories: AllProductCategoriesResolver,
                            productRatings: AllProductRatingsResolver
                        }
                    },
                    {
                        path: 'stories',
                        component: AdminStoriesOverviewComponent,
                        canActivate: [PermissionGuard],
                        data: {permissionLevel: 2},
                        resolve: {stories: AllStoriesResolver}
                    },
                    {
                        path: 'stories/edit/:id',
                        component: AdminStoriesEditComponent,
                        canActivate: [PermissionGuard],
                        data: {permissionLevel: 2},
                        resolve: {story: StoryResolver, products: AllProductWithoutStoryResolver}
                    },
                    {
                        path: 'trade-in',
                        component: AdminTradeInRequestOverviewComponent,
                        canActivate: [PermissionGuard],
                        data: {permissionLevel: 1},
                        resolve: {requests: AllTradeInRequestsResolver}
                    },
                    {
                        path: 'trade-in/edit/:id',
                        component: AdminTradeInRequestEditComponent,
                        canActivate: [PermissionGuard],
                        data: {permissionLevel: 1},
                        resolve: {request: TradeInRequestResolver}
                    },
                    {
                        path: 'credit-indications',
                        canActivate: [PermissionGuard],
                        data: {permissionLevel: 2},
                        component: AdminCreditIndicationsOverviewComponent
                    },
                    {
                        path: 'permissions',
                        canActivate: [PermissionGuard],
                        data: {permissionLevel: 3},
                        component: AdminPermissionsOverviewComponent
                    },
                ]
            },
            { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
            { path: '**', redirectTo: '/not-found' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
