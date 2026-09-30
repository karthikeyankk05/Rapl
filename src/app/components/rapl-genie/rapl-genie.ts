import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rapl-genie',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rapl-genie.html',
  styleUrl: './rapl-genie.css'
})
export class RapLGenie {
  scrollToSection(id: string): void {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
