
export const isDesktopViewport = (page) => {
    const size = page.viewportSize()
    return size >=600
    //return true or false
}