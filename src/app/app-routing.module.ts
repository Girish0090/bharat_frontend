import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ListingComponent } from './listing/listing.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { CareerComponent } from './career/career.component';
import { AgentListingComponent } from './agent-listing/agent-listing.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'career', component: CareerComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'property-detail/:id', component: PropertyDetailComponent },
  // property listing by city
  { path: 'listing/:city', component: ListingComponent },
  { path: 'listing/:city/:location', component: ListingComponent },
  { path: 'agent-list', component: AgentListingComponent },
  {path: 'agent-detail/:id', component: AgentDetailComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
