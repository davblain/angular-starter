import { Component } from '@angular/core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  _isLoggedIn: boolean;

  isLoggedIn(): boolean {
    return false;
  }
}
