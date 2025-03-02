import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonStyle]',
})
export class ButtonStyleDirective {
  @Input() appButtonStyle: string = 'primary';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setButtonStyle();
  }

  private setButtonStyle() {
    if (this.appButtonStyle === 'primary') {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        'rgb(101, 148, 195)'
      );
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    } else if (this.appButtonStyle === 'warn') {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        '#df948f'
      );
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    } else if (this.appButtonStyle === 'accent') {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        'rgb(244, 199, 133)'
      );
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    }
  }
}
