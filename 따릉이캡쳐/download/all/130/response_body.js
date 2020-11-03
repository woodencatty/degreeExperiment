/**
 * V1.0.1
 * </> with <3 by Adrien
 * https://github.com/kaddyadriano/jquery-styled-select-box
 */
(function($, d){
    $(d).ready(function(){
        $('select.styled').styledSelect();
        $(d).on('click', function(e){
            var el = $(e.target),
                isSelect = el.closest('.styled-select').length;
            if(!isSelect){
                $('.styled-select .options').hide();
                $('.styled-select').removeClass('open');
            }
        });
    });
    $.fn.styledSelect = function() {
        if (!this.length) return false;
        this.each(function(k, select){
            select = $(select);
            var val = select.val(),
                selectedTitle = $('option[value="' + val + '"]').html(),
                options = $('option', select),
                html = '';
            html += '<div class="styled-select"><span class="selected-display">' + selectedTitle + '</span><span class="arrow-wrap"></span></span>';
            html += '<div class="options">';
            options.each(function (k, opt) {
                opt = $(opt);
                html += '<div class="option' + (opt.attr('value') == val ? ' selected' : '') + '" data-value="' + opt.attr('value') + '">' + opt.html() + '</div>';
            });
            html += '</div>';
            html += '</div>';
            var htmlSelect = $(html);
            htmlSelect.css({width: Number(parseInt(select.css('width')) + 82) + 'px'});
            select.hide().before(htmlSelect);
            $('.option', htmlSelect).on('click', function (e) {
                var opt = $(this),
                    optVal = opt.attr('data-value'),
                    optTitle = opt.html(),
                    val = select.val();
                if (optVal != val) {
                    $('.selected-display', htmlSelect).html(optTitle);
                    select.val(optVal).trigger('change');
                }
                $('.option', htmlSelect).removeClass('selected');
                opt.addClass('selected');
                toggleOptions(htmlSelect);
            });

            $('.selected-display, .arrow-wrap', htmlSelect).on('click', function (e) {
                toggleOptions(htmlSelect);
            });

            refresh = function(){
                var val = select.val(),
                    opt = $("option[value='"+val+"']", select),
                    optTitle = opt.html();
                    $('.selected-display', htmlSelect).html(optTitle);
                    $('.option', htmlSelect).removeClass('selected');
                    $('.option[data-value="'+val+'"]', htmlSelect).addClass('selected');
            }

            toggleOptions = function (htmlSelect) {
                if (htmlSelect.hasClass('open')) {
                    $('.options', htmlSelect).hide();
                    htmlSelect.removeClass('open');
                } else {
                    htmlSelect.addClass('open');
                    $('.options', htmlSelect).show();
                }
            }

            //events
            select.on('refresh', function(e){
                refresh();
            });


        });


    }
    if(!$("style.styled-select-box-style").length) {
        var style = "<style class='styled-select-box-style' type='text/css'>" +
            "select.styled {display: none}\n" +
            ".styled-select {\n" +
            "  color: #222;\n" +
            "  padding-left: 20px;\n" +
            "  line-height: 38px;\n" +
            "  height: 38px;\n" +
            "  background-image: none;\n" +
            "  background-color: #fff;\n" +
            "  border-top: none;\n" +
			"  border-bottom: none;\n" +
			"  border-left: none;\n" +
			"  border-right: 1px solid #222;\n" +
            "  border-radius: 0px;\n" +
            "  font-size: 13px;\n" +
            "  cursor: pointer;\n" +
            "  position: relative;\n" +
            "  box-sizing: border-box;\n" +
            "}\n" +
            "\n" +
            ".styled-select .selected-display {\n" +
            "  display: block\n" +
            "}\n" +
            "\n" +
            ".styled-select .arrow-wrap {\n" +
            "  display: block;\n" +
            "  width: 30px;\n" +
            "  height: 100%;\n" +
            "  position: absolute;\n" +
            "  top: 0;\n" +
            "  right: 0;\n" +
            "  text-align: center;\n" +
            "  font-size: 10px\n" +
            "}\n" +
            "\n" +
            ".styled-select .arrow-wrap:after {\n" +
            "  content: \"\";\n" +
            "  position: absolute;\n" +
            "  width: 0; \n" +
            "  height: 0; \n" +
            "  border-left: 4px solid transparent;\n" +
            "  border-right: 4px solid transparent;\n" +
            "  border-top: 6px solid #222;\n" +
            "  top: 50%;\n" +
            "  right: 50%;\n" +
            " transform: translate(50%, -50%);\n" +
            "}\n" +
            ".styled-select.open .arrow-wrap:after {\n" +
            "  border-left: 4px solid transparent;\n" +
            "  border-right: 4px solid transparent;\n" +
            "  border-bottom: 6px solid #222;\n" +
            "  border-top: 0" +
            "}\n" +
            "\n" +
            ".styled-select .options {\n" +
            "  width: 100%;\n" +
            "  max-height: 200px;\n" +
            "  background: #fff;\n" +
            "  overflow-y: auto;\n" +
            "  position: absolute;\n" +
            "  z-index: 100;\n" +
            "  left: 0;\n" +
            "  padding: 10px;\n" +
			"  border: 1px solid #222;\n" +
            "  box-sizing: border-box;\n" +
            "  display: none\n" +
            "}\n" +
            "\n" +
            ".styled-select .options .option {\n" +
            "  font-size: 13px;\n" +
            "  color: #1E1D1D;\n" +
            "  padding: 4px 7px 6px;\n" +
            "  line-height: 22px;\n" +
            "}\n" +
            "\n" +
            ".styled-select .options .option:hover, .styled-select .options .option.selected {\n" +
            "  color: #515151;\n" +
            "  font-weight: bold\n" +
            "}" +
            "</style>";

        $('html head').append(style);
    }

})(jQuery, document);
