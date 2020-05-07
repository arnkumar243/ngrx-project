import { Directive, OnInit, ElementRef, Renderer2, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdownDirective]'
})

export class DropDownDirective implements OnInit {

    private className = 'open';

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {}

    @HostListener('click')
    onClick() {
        if (this.elementRef.nativeElement.classList.contains(this.className)) {
            this.renderer.removeClass(this.elementRef.nativeElement, this.className);
        } else {
            this.renderer.addClass(this.elementRef.nativeElement, this.className);
        }
    }

}