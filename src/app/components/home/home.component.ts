import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile: boolean = true;
  isCollapsed: boolean = true;
  currentNav: string = 'view';
  userRole: string = '';

  constructor(
    private obs: BreakpointObserver,
    private userService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.obs.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.userRole = this.userService.getCurrentUserRole();
    if (this.userRole === 'admin') {
      this.currentNav = 'view';
    } else {
      this.currentNav = 'task';
    }

    console.log(this.userRole);
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  //function for highlighting selected nav

  toggleNav(currentNavName: string) {
    this.currentNav = currentNavName;
  }

  logout() {
    console.log('hai');
    this.userService.userLogout();
  }
}
