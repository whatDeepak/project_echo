// Customisation
const refreshDragThreshold: number = 100;
const refreshGrowMultiplier: number = 0.5;

const logoFadeDuration: number = 0.2;
const logoRunnerDuration: number = 1;
const logoWaitDuration: number = 0.25;
const logoRunnerLength: number = 300;

// Elements
const pageElement: HTMLElement | null = document.querySelector('.page');
const refresherElement: HTMLElement | null = document.querySelector('.refresher');
const logoWrapperElement: HTMLElement | null = document.querySelector('.logoWrapper');
const logoElement: HTMLElement | null = document.querySelector('#animated-logo');
let logoRunnerElement: SVGPathElement | null = document.querySelector('.animated-logo-runner');
const logoSelectorElement: HTMLSelectElement | null = document.querySelector('#logo-selector');

// State & Private Variables
let logoLength: number = 0;
const refresherHeight: number = refresherElement?.clientHeight || 0;
let cursorDown: boolean = false;
let isPullingPage: boolean = false;
let isLoading: boolean = false;
let cursorStartY: number = 0;
let cursorDeltaY: number = 0;

// Export the function for use in other modules
export async function refreshLogo() {
  // ... (rest of the code)
  LoadLogo("threads-logo");

  // Events
  if (pageElement) {
    pageElement.addEventListener('mousedown', onPress);
    pageElement.addEventListener('touchstart', onPress);

    pageElement.addEventListener('mouseup', onRelease);
    pageElement.addEventListener('touchend', onRelease);

    pageElement.addEventListener('mousemove', (e) => onDrag(e.clientY, e));
    pageElement.addEventListener('touchmove', (e) => onDrag(e.touches[0].clientY, e));
  }

  if (window) {
    window.addEventListener('keydown', async (e) => {
      if (e.code === "KeyR" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isLoading) return;
        isPullingPage = true;
        if (pageElement) {
          pageElement.scrollTop = 0;
          pageElement.classList.toggle('pop', true);
        }
        if (refresherElement) {
          refresherElement.classList.toggle('pulling', true);
        }
        if (logoElement) {
          logoElement.style.setProperty('--logo-runner-offfset', `${-logoLength}px`);
        }
        if (logoRunnerElement) {
          logoRunnerElement.style.transition = logoRunnerDuration + 's ease-in-out';
        }
        
        if (logoElement) {
          logoElement.classList.toggle('loading', true);
        }
        startLoading();
        await WaitFor(logoRunnerDuration + logoWaitDuration);
        if (logoElement) {
          logoElement.style.setProperty('--logo-runner-offfset', '0');
        }
        if (pageElement) {
          pageElement.classList.toggle('pop', false);
        }
        isPullingPage = false;
        if (refresherElement) {
          refresherElement.classList.toggle('pulling', false);
        }
        if (logoRunnerElement) {
          logoRunnerElement.style.transition = '';
        }
      }
    });
  }

  if (logoSelectorElement) {
    logoSelectorElement.addEventListener('change', () => LoadLogo(logoSelectorElement.value));
  }

  function onPress() {
    cursorDown = true;
  }

  function onRelease() {
    cursorDown = false
    if (!isPullingPage) return;
    
    if (cursorDeltaY === refreshDragThreshold) {
      startLoading();
    }
    
    isPullingPage = false;
    if (refresherElement) {
      refresherElement.classList.toggle('pulling', false);
    }
    if (pageElement) {
      pageElement.classList.toggle('pop', false);
    }
    if (refresherElement) {
      refresherElement.style.height = '';
    }
    if (logoWrapperElement) {
      logoWrapperElement.style.transform = '';
    }
    if (logoElement) {
      logoElement.style.setProperty('--logo-runner-offfset', '0');
    }
  }

  function onDrag(cursorY: number, event: MouseEvent | TouchEvent) {
    if (!cursorDown) return;
    if (isLoading) return;
    if (pageElement && pageElement.scrollTop !== 0) return;
    event.preventDefault();
    
    if (!isPullingPage) {
      cursorStartY = cursorY;
    }
    
    cursorDeltaY = Math.min(Math.max(cursorY - cursorStartY, 0), refreshDragThreshold);
    
    const dragProgress = (cursorDeltaY / refreshDragThreshold);
    if (logoWrapperElement) {
      logoWrapperElement.style.transform = `scale(${
        1 + (refreshGrowMultiplier * dragProgress)
      })`;
    }
    if (refresherElement) {
      refresherElement.style.height = `${refresherHeight + cursorDeltaY}px`;
    }
    if (logoElement) {
      logoElement.style.setProperty('--logo-runner-offfset',`${RemapRange(dragProgress, 0, 1, logoRunnerLength, -logoLength)}px`);
    }
    
    if (refresherElement) {
      refresherElement.classList.toggle('pulling', cursorDeltaY > 0);
    }
    if (pageElement) {
      pageElement.classList.toggle('pop', cursorDeltaY === refreshDragThreshold);
    }
    isPullingPage = true;
  }

  // ... (rest of the code)
  
async function startLoading() {
    if(logoElement){
        if (logoElement.classList.contains('active')) return;
        logoElement.classList.toggle('active', true);
        isLoading = true;
        
        // Animate back again
        if (!logoElement.classList.contains('loading')) {
        await WaitFor(logoWaitDuration + logoRunnerDuration);
        logoElement.classList.toggle('loading', true);
        }
        
        // Animate the full logo
        await WaitFor(logoWaitDuration + logoRunnerDuration);
        logoElement.classList.toggle('loading', false);
        logoElement.classList.toggle('complete', true);
        
        await WaitFor(logoRunnerDuration);
        stopLoading();
    }
  }
  
  async function stopLoading() {
    if(logoElement){
        if (!logoElement.classList.contains('active')) return;
        logoElement.classList.toggle('active', false);
        
        // Wait for the logo animations to reset
        await WaitFor(logoFadeDuration * 1.5);
        
        logoElement.classList.toggle('loading', false);
        logoElement.classList.toggle('complete', false);
        isLoading = false;
    }
  }
  
  function WaitFor(time: number) {
     return new Promise<void>((res) => setTimeout(() => res(), time * 1000));
  }
  
  function RemapRange(value: number, low1: number, high1: number, low2: number, high2: number) {
      return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }
  
  

// ...

function LoadLogo(logo: string) {
  if (logoElement) {
    const logoElementById = document.querySelector(`#${logo}`);
    if (logoElementById) {
      logoElement.innerHTML = logoElementById.innerHTML;
      logoRunnerElement = logoElement.querySelector('.animated-logo-runner') as SVGPathElement | null;

      if (logoRunnerElement) {
        logoLength = logoRunnerElement.getTotalLength();
        logoElement.style.setProperty('--logo-length', logoLength.toString());
        logoElement.style.setProperty('--logo-runner-length', logoRunnerLength.toString());
        logoElement.style.setProperty('--logo-runner-offfset', '0');
        logoElement.style.setProperty('--logo-duration-fade', `${logoFadeDuration}s`);
        logoElement.style.setProperty('--logo-duration-runner', `${logoRunnerDuration}s`);
      }
    }
  }
}
}