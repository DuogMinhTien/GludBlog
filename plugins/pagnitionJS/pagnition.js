let boxContainArr = [];
var nowPage = 1;
jQuery.fn.extend({
    pagnition (obj) {
        boxContainArr.push (1);

        let _this = this;

        let delegate = $(obj.delegate, _this);
        let sizePage = obj.sizePage || 6;
        let boxContainLength = boxContainArr.length;
        let boxContain = $(`<div class='box-contain-${boxContainLength}' style="display: none"></div>`);
        let nextPagnition = undefined;
        let prevPagnition = undefined;
        let firstPagnition = undefined;
        let lastPagnition = undefined;
        let pagnitionNumber = [];
        let sizePagnition = obj.sizePagnition || 5;
        let numberPage = 1;

        let currentPage = 1;

        let ulPagnition = $("<ul class='ListMovePage'></ul>");
        let divWrapPagnitionNumber = $(`<div class="wrap-pagnition-navigate__number"></div>`);
        
        function responsiveObj (obj) {
            sizePagnition = obj.sizePagnition || sizePagnition;
            sizePage = obj.sizePage || sizePage;
            
            renderPagnition ();
            renderPage ({
                responsive: true
            });
        }
        function responsive () {
            if (obj.responsive.length) {
                if (window.innerWidth > obj.responsive[0].breakpoint) {
                    responsiveObj (obj);
                }
                else {
                    for (let i=0; i<obj.responsive.length; i++) {
                        console.log (obj.responsive[i].breakpoint);
                        if (window.innerWidth <= obj.responsive[i].breakpoint) {
                            responsiveObj (obj.responsive[i].setting);
                        }
                    }  
                }
            }
        }
        window.addEventListener ("resize", () => {
            responsive ();
        })
        function renderPagnition () {
            $(divWrapPagnitionNumber).empty ();
            if (currentPage < Math.ceil(sizePagnition / 2)) {
                for (let i=0; i<Math.min (sizePagnition, numberPage); i++) {
                    $(pagnitionNumber[i]).appendTo (divWrapPagnitionNumber);
                    $(pagnitionNumber[i]).on ("click", () => {
                        changePage (i+1);
                    })
                }
            }
            else if (currentPage > numberPage - Math.ceil(sizePagnition / 2)) {
                for (let i=numberPage-sizePagnition; i<numberPage; i++) {
                    $(pagnitionNumber[i]).appendTo (divWrapPagnitionNumber);
                    $(pagnitionNumber[i]).on ("click", () => {
                        changePage (i+1);
                    })
                }
            }
            else {
                for (let i=currentPage - Math.ceil(sizePagnition / 2); i<currentPage + Math.floor(sizePagnition / 2); i++) {
                    $(pagnitionNumber[i]).appendTo (divWrapPagnitionNumber);
                    $(pagnitionNumber[i]).on ("click", () => {
                        changePage (i+1);
                    })
                }
            }
            if (currentPage == 1) {
                $(firstPagnition).addClass ("disable");
                $(prevPagnition).addClass ("disable");
            }
            else {
                $(firstPagnition).removeClass ("disable");
                $(prevPagnition).removeClass ("disable");
            }
            if (currentPage == numberPage) {
                $(lastPagnition).addClass ("disable");
                $(nextPagnition).addClass ("disable");
            }
            else {
                $(lastPagnition).removeClass ("disable");
                $(nextPagnition).removeClass ("disable");
            }
        }
        function findElement (index) {
            for (let i of Array.from ($(obj.delegate, boxContain))) {
                if ($(i).attr ("data-index-pagnition"+boxContainLength) == index) {
                    return i;
                }
            }
        }
        function addBoxContain () {
            let x = $(".pagnition-wrap", _this);
            let y = $(obj.delegate, x);
            y.appendTo (boxContain);
        }
        function renderPage (obj_renderPage) {
            addBoxContain ();
            $(".pagnition-wrap", _this).empty ();
            for (let i=currentPage*sizePage - sizePage; i<Math.min (currentPage*sizePage, delegate.length); i++) {
                $(".pagnition-wrap", _this).append (findElement(i));
            }
        }
        function changePage (index) {
            $(pagnitionNumber[currentPage - 1]).removeClass ("active");
            $(pagnitionNumber[index - 1]).addClass ("active");
            currentPage = index;
            renderPagnition ();
            renderPage ();
            if (obj.scrollEl == 'top-page') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else {
                let scrollEl = obj.scrollEl ? $(obj.scrollEl)[0] : _this[0];
                scrollEl.scrollIntoView ({
                    block: 'start',
                    behavior: obj.scrollBehavior || 'smooth',
                })
            }

            if (obj.unique) window.location.href = "#page_"+index;
            nowPage = index;
        }

        if (delegate.length > sizePage) {
            numberPage = Math.ceil (delegate.length / sizePage);
        }
        if (obj.useLastFirst) {
            firstPagnition = $(`<li class="moveSymbol moveItem">${obj.contentMoveFirst || 'First'}</li>`);
            $(firstPagnition).on ("click", () => {
                if (!$(firstPagnition).hasClass ("disable")) {
                    changePage (1);
                }
            })
            lastPagnition = $(`<li class="moveSymbol moveItem">${obj.contentMoveLast || 'Last'}</li>`);
            $(lastPagnition).on ("click", () => {
                if (!$(lastPagnition).hasClass ("disable")) {
                    changePage (numberPage);
                }
            })
        }
        if (obj.useNextPrev) {
            nextPagnition = $(`<li class="moveSymbol moveItem">${obj.contentNext || 'Next'}</li>`);
            $(nextPagnition).on ("click", () => {
                if (!$(nextPagnition).hasClass ("disable")) {
                    changePage (currentPage + 1);
                }
            })
            prevPagnition = $(`<li class="moveSymbol moveItem">${obj.contentPrev || 'Prev'}</li>`);
            $(prevPagnition).on ("click", () => {
                if (!$(prevPagnition).hasClass ("disable")) {
                    changePage (currentPage - 1);
                }
            })
        }
        divWrapPagnitionNumber.appendTo (ulPagnition);
        for (let i=1; i<=numberPage; i++) {
            let x = $(`<li class="moveNumber moveItem">
                        <a href="#${i}">${i}</a>
                    </li>`);
            pagnitionNumber.push (x);
        }

        $(pagnitionNumber[currentPage - 1]).addClass ("active");
        renderPagnition ();
        if (obj.useNextPrev) {
            $(prevPagnition).prependTo (ulPagnition);
            $(nextPagnition).appendTo (ulPagnition);
        }
        if (obj.useLastFirst) {
            $(firstPagnition).prependTo (ulPagnition);
            $(lastPagnition).appendTo (ulPagnition);
        }
        ulPagnition.appendTo ($(".pagnition-navigation", _this));
        for (let i = 0; i<delegate.length; i++) {
            $(delegate[i]).attr ("data-index-pagnition"+boxContainLength,i);
        }
        boxContain.appendTo ($("body"));
        responsive ();
    }
  });

