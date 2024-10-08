/** object */
var keypress_status = 0;
var Xcrud = {
    config: function(key) {
        if (xcrud_config[key] !== undefined) {
            return xcrud_config[key];
        } else {
            return key;
        }
    },
    current_tab: null,
    current_selection: null,
    lang: function(key) {
        if (xcrud_config['lang'][key] !== undefined) {
            return xcrud_config['lang'][key];
        } else {
            return key;
        }
    },
    current_task: null,
    request: function(container, data, success_callback, reload_after = true) {
        //$(container).trigger("xcrudbeforerequest");
        Xcrud.current_selection = data;
        /*$('.parsley-div :input:not(:button)').each(function (index, value) { 
        	console.log(index);
            //$(this).parsley().validate();
            console.log($(this).parsley().validate());
        });*/

        var valid = true;
        try {
            valid = $('.parsley-form').parsley().validate();
        } catch (e) {

        }

        /*$(".parsley-div").wrap("<form id='parsley-form'></form>");
	    $('.parsley-form').parsley().validate();
	    $(".parsley-div").unwrap();*/

        if (!valid && data.task != 'list') {
            return;
        }

        $(document).trigger("xcrudbeforerequest", [container, data]);

        if (data.editmode == "inline") {
            data.editmode = '';
        }

        $.ajax({
            type: "post",
            url: Xcrud.config('url'),
            beforeSend: function() {
                Xcrud.current_task = data.task;
                Xcrud.show_progress(container);
            },
            data: {
                "xcrud": data
            },
            success: function(response) {

                //modal //save  //edit
                //minize
                if (data.task == "edit" && data.editmode == "side") {

                    if (Xcrud.config('theme') == 'default') {
                        $(".xcrud-list-container").addClass('grid-shrinked');
                        $(".xcrud-list-container").removeClass('grid-expanded');

                        $(".dropdown-toggle").on("click", ".xcrud-action", function() {

                            //console.log("Test");

                        });

                    } else if (Xcrud.config('theme') == 'semantic') {

                        $(".xcrud-list-container").removeClass('sixteen');
                        $(".xcrud-list-container").removeClass('wide');
                        $(".xcrud-list-container").removeClass('column');

                        $(".xcrud-list-container").addClass('nine');
                        $(".xcrud-list-container").addClass('wide');
                        $(".xcrud-list-container").addClass('column');


                    } else {
                        $(".xcrud-list-container").removeClass('col-sm-12');
                        $(".xcrud-list-container").addClass('col-sm-6');
                        $(".xcrud-list-container").addClass('overflow-hidden');
                    }

                } else if (data.task == "list" && data.editmode == "side") {
                    $(".xcrud-list-container").removeClass('col-sm-6');
                    $(".xcrud-list-container").addClass('col-sm-12');
                    $(".xcrud-list-container").removeClass('overflow-hidden');
                }


                if (data.task == "edit") {
                    //var content = $(this).data("content");					
                    if (data.editmode == "modal") {
                        var header = ""; //$(this).data("header");
                        Xcrud.modal(header, response);

                        $(".modal-title").hide();
                        if (reload_after) {
                            $(document).trigger("xcrudafterrequest", [container, data, status]);
                        }

                        //Xcrud.init_actions($("#xcrud-modal-window"));
                        if (success_callback) {
                            var formField = $(".xcrud-modal-window").find("[name='key']").val();
                        }

                    } else if (data.editmode == "side") {
                        var header = ""; //$(this).data("header");
                        $(".edit_side_panel").html(response);
                        $(document).trigger("xcrudafterrequest", [container, data, status]);
                        //Xcrud.init_actions($("#xcrud-modal-window"));

                        if (success_callback) {
                            var formField = $(".xcrud-modal-window").find("[name='key']").val();
                        }
                    } else {
                        jQuery(container).html(response);
                        //jQuery(container).trigger("xcrudafterrequest");
                        var status = Xcrud.check_message(container);
                        jQuery(document).trigger("xcrudafterrequest", [container, data, status]);
                        if (success_callback) {
                            success_callback(container);
                        }
                    }

                } else if (data.task == "save") {

                    if (data.after == "edit" || data.after == "create") {
                        if (data.editmode == "modal") {
                            var header = ""; //$(this).data("header");
                            Xcrud.modal(header, response);
                            $(".modal-title").hide();

                            if (reload_after) {
                                $(document).trigger("xcrudafterrequest", [container, data, status]);
                            }

                            //Xcrud.init_actions($("#xcrud-modal-window"));

                            var modalCount = $("#xcrud-modal-window").length;
                            var xcrudListingCount = $(".xcrud-ajax").length;

                            if (xcrudListingCount == 1 || xcrudListingCount < 1) {
                                //$('.modal-backdrop').remove();
                                //$("#xcrud-modal-window").remove();
                                $("#xcrud-overlay").remove();
                                $(".xcrud-overlay").remove();
                                //$("body").removeClass("modal-open");

                            } else {

                                if (modalCount == 0) {
                                    $('.modal-backdrop').remove();
                                    $(container).closest("#xcrud-modal-window").remove();
                                    $("#xcrud-overlay").remove();
                                    $(".xcrud-overlay").remove();
                                    $("body").removeClass("modal-open");

                                } else {
                                    $("body").removeClass("modal-open");
                                }
                            }

                            //alert("dddd");
                            if (success_callback) {
                                $('.modal-backdrop').remove();
                                if ($(container).closest(".xcrud-modal-window").length) {
                                    var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                                    $(container).closest(".xcrud-ajax").find("[name='key']").val(formField);
                                }
                            }

                        } else if (data.editmode == "side") {

                            var header = ""; //$(this).data("header");
                            $(".edit_side_panel").html(response);
                            var status = Xcrud.check_message(container);

                            if (reload_after) {
                                $(document).trigger("xcrudafterrequest", [container, data, status]);
                            }

                            //Xcrud.request($(".edit_side_panel"), Xcrud.list_data($(".edit_side_panel")));
                            //Xcrud.reload();
                            if (success_callback) {
                                if ($(container).closest(".xcrud-modal-window").length) {
                                    var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                                    $(container).closest(".xcrud-ajax").find("[name='key']").val(formField);
                                }
                                success_callback(container);
                            }

                        } else {

                            var modalCount = $("#xcrud-modal-window").length;
                            var xcrudListingCount = $(".xcrud-ajax").length;

                            if (xcrudListingCount == 1 || xcrudListingCount < 1) {
                                $('.modal-backdrop').remove();
                                $("#xcrud-modal-window").remove();
                                $("#xcrud-overlay").remove();
                                $(".xcrud-overlay").remove();
                                $("body").removeClass("modal-open");

                            } else {

                                if (modalCount == 0) {
                                    $('.modal-backdrop').remove();
                                    $("#xcrud-modal-window").remove();
                                    $("#xcrud-overlay").remove();
                                    $(".xcrud-overlay").remove();
                                    $("body").removeClass("modal-open");
                                } else {
                                    //$("body").removeClass("modal-open");
                                }
                            }

                            $(container).html(response);
                            var status = Xcrud.check_message(container);
                            if (reload_after) {
                                 $(document).trigger("xcrudafterrequest", [container, data, status]);
                            }

                            if (success_callback) {
                                if ($(".xcrud-modal-window").length) {
                                    var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                                    $(container).closest(".xcrud-ajax").find("[name='key']").val(formField);
                                }
                                success_callback(container);
                            }
                        }
                    } else {

                        var modalCount = $("#xcrud-modal-window").length;

                        //var xcrudListingCount = $(".xcrud-ajax").length;
                        var xcrudListingCount = $(container).closest(".xcrud-ajax").length;

                        if (xcrudListingCount == 1 || xcrudListingCount < 1) {
                            $('.modal-backdrop').remove();
                            $(container).closest("#xcrud-modal-window").remove();
                            $("#xcrud-overlay").remove();
                            $(".xcrud-overlay").remove();
                            $("body").removeClass("modal-open");
                            $(container).html(response);

                        } else {

                            $(container).html(response);
                            modalCount = $("#xcrud-modal-window").length;
                            if (modalCount == 0) {
                                $('.modal-backdrop').remove();
                                $(container).closest("#xcrud-modal-window").remove();
                                $("#xcrud-overlay").remove();
                                $(".xcrud-overlay").remove();
                                $("body").removeClass("modal-open");
                                $(container).html(response);
                            } else {
                                $(container).html(response);
                                $("body").removeClass("modal-open");
                            }
                        }

                        var status = Xcrud.check_message(container);
                        if (reload_after) {
                            $(document).trigger("xcrudafterrequest", [container, data, status]);
                        }

                        if (success_callback) {
                            var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                            $(container).closest(".xcrud-ajax").find("[name='key']").val(formField);
                            success_callback(container);
                        }
                    }

                } else if (data.task == "create") {

                    $(container).closest(".xcrud-ajax").find("[name='primary']").val("");

                    if (data.editmode == "modal") {
                        var header = ""; //$(this).data("header");
                        Xcrud.modal(header, response);
                        $(".modal-title").hide();
                        if (reload_after) {
                            $(document).trigger("xcrudafterrequest", [container, data, status]);
                        }

                        //Xcrud.init_actions($("#xcrud-modal-window"));

                        if (success_callback) {
                            var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                        }

                    } else if (data.editmode == "side") {

                        var header = ""; //$(this).data("header");
                        $(".edit_side_panel").html(response);

                        var status = Xcrud.check_message(container);
                        if (reload_after) {
                            $(document).trigger("xcrudafterrequest", [container, data, status]);
                        }

                        if (success_callback) {
                            var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                            $(container).closest(".xcrud-ajax").find("[name='key']").val(formField);
                            success_callback(container);
                        }

                    } else {

                        $(container).html(response);
                        $('.modal-backdrop').remove();
                        var status = Xcrud.check_message(container);
                        if (reload_after) {
                            $(document).trigger("xcrudafterrequest", [container, data, status]);
                        }

                        if (success_callback) {
                            var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                            $(container).closest(".xcrud-ajax").find("[name='key']").val(formField);
                            success_callback(container);

                        }
                    }

                } else if (data.task == "view") {

                    if (data.editmode == "modal") {
                        var header = ""; //$(this).data("header");
                        Xcrud.modal(header, response);
                        $(".modal-title").hide();
                        if (reload_after) {
                            $(document).trigger("xcrudafterrequest", [container, data, status]);
                        }

                        //Xcrud.init_actions($("#xcrud-modal-window"));

                        if (success_callback) {
                            var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                        }

                    } else if (data.editmode == "side") {

                        var header = ""; //$(this).data("header");
                        $(".edit_side_panel").html(response);

                        var status = Xcrud.check_message(container);
                        if (reload_after) {
                            $(document).trigger("xcrudafterrequest", [container, data, status]);
                        }

                        if (success_callback) {
                            if ($(container).closest(".xcrud-modal-window").length) {
                                var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                                $(container).closest(".xcrud-ajax").find("[name='key']").val(formField);
                            }
                            success_callback(container);
                        }

                    } else {

                        //check how many listing are there

                        $(container).html(response);
                        $('.modal-backdrop').remove();
                        var status = Xcrud.check_message(container);
                        if (reload_after) {
                            $(document).trigger("xcrudafterrequest", [container, data, status]);
                        }

                        if (success_callback) {
                            if ($(".xcrud-modal-window").length) {
                                var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                                $(container).closest(".xcrud-ajax").find("[name='key']").val(formField);
                            }
                            success_callback(container);
                        }
                    }

                } else {

                    $("body").removeClass("modal-open");
                    var modalCount = $("#xcrud-modal-window").length;
                    var xcrudListingCount = $(container).closest(".xcrud-ajax").length;

                    if (xcrudListingCount == 1 || xcrudListingCount < 1) {
                        $(container).html(response);
                        $('.modal-backdrop').remove();
                    } else {
                        if (modalCount == 1) { //Check if modal is open
                            if (data.task == "list") { //if it is a list
                                $(container).html(response);
                                modalCount = $("#xcrud-modal-window").length;
                                if (modalCount == 0) { //if modal is still open it means its a child list
                                    $('.modal-backdrop').remove();
                                }
                            }
                            if (data.task == "refresh") {
                                $(container).html(response);
                                $('.modal-backdrop').remove();
                            }
                        } else if (modalCount == 0) { //if modal is still open it means its a child list
                            $('.modal-backdrop').remove();
                            $(container).html(response);
                        }
                    }

                    Xcrud.check_script(container);

                    var status = Xcrud.check_message(container);

                    if (data.task != "refresh") {
                        $(document).trigger("xcrudafterrequest", [container, data, status]);
                    }

                    var modalCount = $("#xcrud-modal-window").length;

                    if (success_callback) {
                        if ($(container).closest("#xcrud-modal-window").length) {
                            var formField = $(container).closest(".xcrud-modal-window").find("[name='key']").val();
                            $(container).closest(".xcrud-ajax").find("[name='key']").val(formField);
                        }
                        success_callback(container);

                    }
                }

            },
            complete: function() {
                Xcrud.hide_progress(container);

                //$("#xcrud-modal-window").remove();
                //$("#xcrud-overlay").remove();
                //console.log($(".xcrud-modal-window").find("[name='key']").val());
                //console.log($(".xcrud-modal-window[name='key']").val());

            },
            dataType: "html",
            cache: false
        });
    },
    request_inline_edit: function(container, data, e, success_callback) {

        $(document).trigger("xcrudbeforerequest", [container, data]);

        $.ajax({
            type: "post",
            url: Xcrud.config('url'),
            beforeSend: function() {
                Xcrud.current_task = data.task;
                Xcrud.current_task = data.field;
                Xcrud.show_progress(container);
            },
            data: {
                "xcrud": data
            },
            success: function(response) {

                var html = response;
                var objs = jQuery.parseHTML(html);

                var values = {};

                $.each(objs, function(i, field) {
                    //values[field.name] = field.value;
                    if (field.name == "key") {
                        //$(".xcrud-ajax").find("[name='key']").val(field.value);
                        $(e).closest(".xcrud-ajax").find("[name=key]").val(field.value);
                    }
                    if (field.name == "instance") {
                        //$(".xcrud-ajax").find("[name='instance']").val(field.value);
                        $(e).closest(".xcrud-ajax").find("[name=instance]").val(field.value);
                    }
                });

                success_callback(response);
                //$(this).html(response);			   
                /*var formField = $(objs).find("[name='key']").val();
                $(".xcrud-ajax").find("[name='key']").val(formField);
                alert(formField);*/

                //var $inputs = $('#myForm :input');

                // not sure if you wanted this, but I thought I'd add it.
                // get an associative array of just the values.
                //var values = {};
                //$inputs.each(function() {
                //    values[this.name] = $(this).val();
                //});

                //var formField = $(".xcrud-modal-window").find("[name='key']").val();
                //$(".xcrud-ajax").find("[name='key']").val(formField);

                /*if(data.task == "edit"){
					
					//jQuery(container).html(response);
					//jQuery(container).trigger("xcrudafterrequest");
	                var status = Xcrud.check_message(container);
					jQuery(document).trigger("xcrudafterrequest", [container, data, status]);
					if (success_callback) {
						//success_callback(container);
					}
				}*/

            },
            complete: function() {
                Xcrud.hide_progress(container);

            },
            dataType: "html",
            cache: false
        });
    },
    new_window_request: function(container, data) {
        var html = Xcrud.data2form(data);
        var w = window.open("", "Xcrud_request", "scrollbars,resizable,height=400,width=600");
        w.document.open();
        w.document.write(html);
        w.document.close();
        $(w.document.body).find('form').submit();
    },
    stringToHTML: function(str, frozen) {

        var dom = document.createElement('div');
        dom.innerHTML = str;
        if (frozen) {
            dom.className = "tabulator-cell tabulator-frozen tabulator-frozen-right";
        } else {
            dom.className = "tabulator-cell";
        }
        dom.style.position = "absolute"; //"position: absolute;";
        return dom;
    },
    data2form: function(data) {
        var html = '<!DOCTYPE HTML><html><head><meta http-equiv="content-type" content="text/html;charset=utf-8" /></head><body>';
        html += '<form method="post" action="' + Xcrud.config('url') + '">';
        $.map(data, function(value, key) {
            if (!$.isPlainObject(value)) {
                html += '<input type="hidden" name="xcrud[' + key + ']" value="' + value + '" />';
            }
        });
        html += '</form></body></html>';
        return html;
    },
    unique_check: function(container, data, success_callback) {
        data.unique = {};
        data.task = "unique";
        if ($(container).find('.xcrud-input[data-unique]').length) {
            $(container).find('.xcrud-input[data-unique]').each(function(index, element) {
                data.unique[$(element).attr('name')] = $(element).val();
            });
            $.ajax({
                type: "post",
                url: Xcrud.config('url'),
                beforeSend: function() {
                    Xcrud.show_progress(container);
                },
                data: {
                    "xcrud": data
                },
                dataType: "json",
                success: function(response) {
                    //$(container).find(".xcrud-data[name=key]:first").val(response.key);
                    if (response.error) {
                        $(container).find(response.error.selector).addClass('validation-error');
                        //alert(Xcrud.lang('unique_error'));
                        Xcrud.show_message(container, Xcrud.lang('unique_error'), 'error');
                        return false;
                    }
                    if (success_callback) {
                        success_callback(container);
                    }
                },
                complete: function() {
                    Xcrud.hide_progress(container);
                },
                cache: false
            });
        } else {
            if (success_callback) {
                success_callback(container);
            }
        }
    },
    show_progress: function(container) {

        $(container).closest(".xcrud").find(".xcrud-overlay").width($(container).closest(".xcrud-container").width()).stop(true, true).fadeTo(300, 0.6);
        $(container).closest("#content").find(".xcrud-overlay").width($(container).closest(".xcrud-container").width()).stop(true, true).fadeTo(300, 0.6);
        $(container).closest(".xcrud").find(".xcrud-action").prop("disabled", true);
        //alert("Progress");
    },
    hide_progress: function(container) {

        $(container).closest(".xcrud").find(".xcrud-overlay").stop(true, true).css("display", "none");
        $(container).closest("#content").find(".xcrud-overlay").stop(true, true).css("display", "none");
        $(container).closest(".xcrud-action").show();
        $(container).closest(".xcrud").find(".xcrud-action").prop("disabled", false);
        //alert("No Progress");

    },
    get_container: function(element) {
        return $(element).closest(".xcrud-ajax");
    },
    get_container_find: function(element) {
        return $(element).find(".xcrud-ajax");
    },
    list_data: function(container, element) {
        var data = {};
        Xcrud.validation_error = 0;
        Xcrud.save_editor_content(container);
        $(container).find(".xcrud-data").each(function() {
            if (Xcrud.check_container(this, container)) {
                data[$(this).attr("name")] = Xcrud.prepare_val(this);
            }
        });
        if (element && $.isPlainObject(element)) {
            $.extend(data, element);
        } else if (element) {
            $.extend(data, $(element).data());
        }
        data.postdata = {};
        data.advanced_search = {};

        var validation = data.task == 'save' ? true : false;
        if (validation) {
            $(document).trigger("xcrudbeforevalidate", [container]);
        }
        $(container).find('.xcrud-input:not([type="checkbox"],[type="radio"],[disabled])').each(function() {
            if (Xcrud.check_container(this, container)) {
                var val = Xcrud.prepare_val(this);
                data.postdata[$(this).attr("name")] = val;
                var required = $(this).data('required');
                var pattern = $(this).data('pattern');
                if (validation && required && !Xcrud.validation_required(val, required)) {
                    Xcrud.validation_error = 1;
                    $(this).addClass('validation-error');
                } else if (validation && pattern && !Xcrud.validation_pattern(val, pattern)) {
                    Xcrud.validation_error = 1;
                    $(this).addClass('validation-error');
                } else {
                    $(this).removeClass('validation-error');
                }
            }
        });
        $(container).find('.xcrud-input[data-type="checkboxes"]:not([disabled])').each(function() {
            if (data.postdata[$(this).attr("name")] === undefined) {
                data.postdata[$(this).attr("name")] = '';
            }
            if (Xcrud.check_container(this, container) && $(this).prop('checked')) {
                if (!data.postdata[$(this).attr("name")]) {
                    data.postdata[$(this).attr("name")] = Xcrud.prepare_val(this);
                } else {
                    data.postdata[$(this).attr("name")] += "," + Xcrud.prepare_val(this);
                }
            }
        });
        $(container).find('.xcrud-input[type="radio"]:not([disabled])').each(function() {

            if (Xcrud.check_container(this, container) && $(this).prop('checked')) {
                data.postdata[$(this).attr("name")] = Xcrud.prepare_val(this);
            }

        });
        $(container).find('.xcrud-input[data-type="bool"]:not([disabled])').each(function() {
            if (Xcrud.check_container(this, container)) {
                data.postdata[$(this).attr("name")] = $(this).prop('checked') ? 1 : 0;
            }
        });


        //advanced search
        $(container).find(".xcrud-searchdata.xcrud-search-active").each(function() {
            if (Xcrud.check_container(this, container)) {
                data[$(this).attr("name")] = Xcrud.prepare_val(this);
            }
        });
        $(container).find(".xcrud-advanced-searchdata").each(function() {
            if (Xcrud.check_container(this, container)) {
                data.advanced_search[$(this).attr("name")] = Xcrud.prepare_val(this);
            }
        });
        $(container).find('.xcrud-advanced-searchdata[data-type="bool"]:not([disabled])').each(function() {
            if (Xcrud.check_container(this, container)) {
                data.advanced_search[$(this).attr("name")] = $(this).prop('checked') ? 1 : 0;
            }
        });
        $(container).find('.xcrud-advanced-searchdata[type="radio"]:not([disabled])').each(function() {
            if (Xcrud.check_container(this, container) && $(this).prop('checked')) {
                data.advanced_search[$(this).attr("name")] = Xcrud.prepare_val(this);
            }
        });

        $(container).find('.xcrud-advanced-searchdata[data-type="checkboxes"]:not([disabled])').each(function() {
            if (data.advanced_search[$(this).attr("name")] === undefined) {
                data.advanced_search[$(this).attr("name")] = '';
            }
            if (Xcrud.check_container(this, container) && $(this).prop('checked')) {
                if (!data.advanced_search[$(this).attr("name")]) {
                    data.advanced_search[$(this).attr("name")] = Xcrud.prepare_val(this);
                } else {
                    data.advanced_search[$(this).attr("name")] += "," + Xcrud.prepare_val(this);
                }
            }
        });

        if (validation) {
            $(document).trigger("xcrudaftervalidate", [container, data]);
        }
        return data;
    },
    list_advanced_data: function(container, element) {
        var data = {};
        Xcrud.validation_error = 0;
        Xcrud.save_editor_content(container);
        $(container).find(".xcrud-data").each(function() {
            if (Xcrud.check_container(this, container)) {
                data[$(this).attr("name")] = Xcrud.prepare_val(this);
            }
        });
        if (element && $.isPlainObject(element)) {
            $.extend(data, element);
        } else if (element) {
            $.extend(data, $(element).data());
        }
        data.postsearchdata = {};
        var validation = data.task == 'save' ? true : false;
        if (validation) {
            $(document).trigger("xcrudbeforevalidate", [container]);
        }
        $(container).find('.xcrud-input:not([type="checkbox"],[type="radio"],[disabled])').each(function() {
            if (Xcrud.check_container(this, container)) {
                var val = Xcrud.prepare_val(this);
                data.postsearchdata[$(this).attr("name")] = val;
                var required = $(this).data('required');
                var pattern = $(this).data('pattern');
                if (validation && required && !Xcrud.validation_required(val, required)) {
                    Xcrud.validation_error = 1;
                    $(this).addClass('validation-error');
                } else if (validation && pattern && !Xcrud.validation_pattern(val, pattern)) {
                    Xcrud.validation_error = 1;
                    $(this).addClass('validation-error');
                } else {
                    $(this).removeClass('validation-error');
                }
            }
        });
        $(container).find('.xcrud-input[data-type="checkboxes"]:not([disabled])').each(function() {
            if (data.postsearchdata[$(this).attr("name")] === undefined) {
                data.postsearchdata[$(this).attr("name")] = '';
            }
            if (Xcrud.check_container(this, container) && $(this).prop('checked')) {
                if (!data.postsearchdata[$(this).attr("name")]) {
                    data.postsearchdata[$(this).attr("name")] = Xcrud.prepare_val(this);
                } else {
                    data.postsearchdata[$(this).attr("name")] += "," + Xcrud.prepare_val(this);
                }
            }
        });
        $(container).find('.xcrud-input[type="radio"]:not([disabled])').each(function() {
            if (Xcrud.check_container(this, container) && $(this).prop('checked')) {
                data.postsearchdata[$(this).attr("name")] = Xcrud.prepare_val(this);
            }
        });
        $(container).find('.xcrud-input[data-type="bool"]:not([disabled])').each(function() {
            if (Xcrud.check_container(this, container)) {
                data.postsearchdata[$(this).attr("name")] = $(this).prop('checked') ? 1 : 0;
            }
        });
        $(container).find(".xcrud-searchdata.xcrud-search-active").each(function() {
            if (Xcrud.check_container(this, container)) {
                data[$(this).attr("name")] = Xcrud.prepare_val(this);
            }
        });

        if (validation) {
            $(document).trigger("xcrudaftervalidate", [container, data]);
        }
        return data;
    },
    list_controls_data: function(container, element) {
        var data = {};
        $(container).find(".xcrud-data").each(function() {
            if (Xcrud.check_container(this, container)) {
                data[$(this).attr("name")] = Xcrud.prepare_val(this);
            }
        });
        return data;
    },
    check_container: function(element, container) {
        return $(element).closest(".xcrud-ajax").attr('id') == $(container).attr('id') ? true : false;
    },
    save_editor_content: function(container) {
        if ($(container).find('.xcrud-texteditor').length) {
            if (typeof(tinyMCE) != 'undefined') {
                tinyMCE.triggerSave();
                /*for (instance in tinyMCE.editors) {
                					if (tinyMCE.editors[instance] && isNaN(instance * 1)) {
                						if ($('#' + instance).length) {
                							tinyMCE.editors[instance].save();
                						} else {
                							//tinyMCE.editors[instance].destroy();
                							//tinyMCE.editors[instance] = null;
                						}
                					}
                				}*/
            }
            if (typeof(CKEDITOR) != 'undefined') {
                for (instance in CKEDITOR.instances) {
                    if ($('#' + instance).length) {
                        CKEDITOR.instances[instance].updateElement();
                    }
                    /*else {
                    						CKEDITOR.instances[instance].destroy();
                    					}*/
                }
            }
        }
    },
    prepare_val: function(element) {

        console.log("itemy",element);
        switch ($(element).data("type")) {
            case 'datetime':
            case 'timestamp':
            case 'date':
            case 'flatpickr':
            console.log("itemyyyy",$(element).val());
                if ($(element).val()) {
                    var d = $(element).val();
                    // var timestamp = Math.floor(new Date(d).getTime() / 1000);
                    //console.log(timestamp);
                    //return timestamp;
                    return new Date(d) ? Math.round(new Date(d).getTime() / 1000) - new Date(d).getTimezoneOffset() * 60 : '';
                } else
                    return '';
                break;
            case 'time':
                if ($(element).val()) {
                    var d = $(element).datepicker("getDate");
                    return d ? Math.round(d.getTime() / 1000) - d.getTimezoneOffset() * 60 : '';
                } else
                    return '';
                break;
            default:
                return $.trim($(element).val());
                break;
        }
    },
    change_filter: function(type, container, fieldname) {
        $(container).find(".xcrud-searchdata").hide().removeClass("xcrud-search-active");
        var name_selector = '';
        switch (type) {
            case 'datetime':
            case 'timestamp':
            case 'date':
            case 'time':
                var fieldtype = 'date';
                break;
            case 'bool':
                var fieldtype = 'bool';
                break;
            case 'select':
            case 'multiselect':
            case 'radio':
            case 'checkboxes':
                var fieldtype = 'dropdown';
                name_selector = '[data-fieldname="' + fieldname + '"]';
                break;
            default:
                var fieldtype = 'default';
                break;
        }
        $(container).find('.xcrud-searchdata[data-fieldtype="' + fieldtype + '"]' + name_selector).show().addClass("xcrud-search-active");
        if (fieldtype == 'date') {
            Xcrud.init_datepicker_range(type, container);
        }
    },
    init_datepicker_range: function(type, container) {

        try {
            $(container).find('.xcrud-datepicker-from.hasDatepicker,.xcrud-datepicker-to.hasDatepicker').datepicker("destroy");
        } catch (e) {

        }
        var datepicker_config = {
            changeMonth: true,
            changeYear: true,
            showSecond: true,
            dateFormat: Xcrud.config('date_format'),
            timeFormat: Xcrud.config('time_format')
        };
        switch (type) {
            case 'datetime':
            case 'timestamp':
                // to
                datepicker_config.onClose = function(selectedDate) {

                    try {
                        $(container).find('.xcrud-datepicker-from').datetimepicker("option", "maxDate", selectedDate);
                    } catch (e) {

                    }


                }
                datepicker_config.onSelect = datepicker_config.onClose;

                try {
                    $(container).find('.xcrud-datepicker-to').datetimepicker(datepicker_config);
                    datepicker_config.maxDate = $(container).find('.xcrud-datepicker-to').val();
                    datepicker_config.onClose = function(selectedDate) {
                        $(container).find('.xcrud-datepicker-to').datetimepicker("option", "minDate", selectedDate);
                    }
                    datepicker_config.onSelect = datepicker_config.onClose;
                    $(container).find('.xcrud-datepicker-from').datetimepicker(datepicker_config);
                } catch (e) {

                }

                // from

                break;
            case 'date':
                // to

                try {
                    datepicker_config.onClose = function(selectedDate) {
                        $(container).find('.xcrud-datepicker-from').datepicker("option", "maxDate", selectedDate);
                    }
                    datepicker_config.onSelect = datepicker_config.onClose;
                    $(container).find('.xcrud-datepicker-to').datepicker(datepicker_config);
                    // from
                    datepicker_config.maxDate = $(container).find('.xcrud-datepicker-to').val();
                    datepicker_config.onClose = function(selectedDate) {
                        $(container).find('.xcrud-datepicker-to').datepicker("option", "minDate", selectedDate);
                    }
                    datepicker_config.onSelect = datepicker_config.onClose;
                    $(container).find('.xcrud-datepicker-from').datepicker(datepicker_config);
                } catch (e) {

                }

                break;
            case 'time':
                try {
                    $(container).find('.xcrud-datepicker-from,.xcrud-datepicker-to').timepicker(datepicker_config);
                } catch (e) {

                }

                break;
        }
        $(".ui-datepicker").css("font-size", "0.9em"); // reset ui size
    },
    init_flatpickr: function(container){

        const inputElements = document.querySelectorAll('input[flatpickr]');
        // Loop through each input element
        inputElements.forEach(element => {
            // Get the value of flatpickr attribute (element ID)
            const element_id = element.getAttribute('flatpickr');

            // Get the value of attributes_additional attribute
            const attributes_additional = element.getAttribute('attributes_additional');

            // Parse the JSON string to object
            const additionalAttributes = JSON.parse(attributes_additional);

            // Merge additional attributes with default options
            const flatpickrOptions = Object.assign({}, additionalAttributes);

            // Initialize Flatpickr on the current input element
            flatpickr(element, flatpickrOptions);
        });

    },
    init_datepicker: function(container) {
        if ($(container).find(".xcrud-datepicker").length) {
            $(container).find(".xcrud-datepicker").each(function() {
                var element = $(this);
                var format_id = $(this).data("type");
                //console.log(format_id);
                switch (format_id) {
                    case 'datetime':
                    case 'timestamp':
                        element.datetimepicker({
                            showSecond: true,
                            timeFormat: Xcrud.config('time_format'),
                            dateFormat: Xcrud.config('date_format'),
                            firstDay: Xcrud.config('date_first_day'),
                            changeMonth: true,
                            changeYear: true,
                            maxDate: "5Y",
                            minDate: "-100Y",
                            yearRange: "-100:+1"
                        });
                        break;
                    case 'time':
                        element.timepicker({
                            showSecond: true,
                            dateFormat: Xcrud.config('date_format'),
                            timeFormat: Xcrud.config('time_format')
                        });
                        break;
                    case 'date':
                            element.datetimepicker({
                            showSecond: true,
                            timeFormat: Xcrud.config('time_format'),
                            dateFormat: Xcrud.config('date_format'),
                            firstDay: Xcrud.config('date_first_day'),
                            changeMonth: true,
                            changeYear: true,
                            maxDate: "5Y",
                            minDate: "-100Y",
                            yearRange: "-100:+1"
                        });
                        break;
                    default:
                        element.datepicker({
                            dateFormat: Xcrud.config('date_format'),
                            firstDay: Xcrud.config('date_first_day'),
                            changeMonth: true,
                            changeYear: true,
                            onClose: function(selectedDate) {
                                var range_start = element.data("rangestart");
                                var range_end = element.data("rangeend");
                                if (range_start) {
                                    var target = element.closest(".xcrud-ajax").find('input[name="' + range_start + '"]');
                                    $(target).datepicker("option", "maxDate", selectedDate);
                                }
                                if (range_end) {
                                    var target = element.closest(".xcrud-ajax").find('input[name="' + range_end + '"]');
                                    $(target).datepicker("option", "minDate", selectedDate);
                                }
                            }
                        });
                        var range_start = element.data("rangestart");
                        var range_end = element.data("rangeend");
                        if (range_start && element.val()) {
                            var target = element.closest(".xcrud-ajax").find('input[name="' + range_start + '"]');
                            $(target).datepicker("option", "maxDate", element.val());
                        }
                        if (range_end && element.val()) {
                            var target = element.closest(".xcrud-ajax").find('input[name="' + range_end + '"]');
                            $(target).datepicker("option", "minDate", element.val());
                        }
                }
            });
        }
    },
    init_actions: function(container) {

        if ($(".xcrud").length) {

            $(".xcrud").on("change", ".xcrud-actionlist", function() {
                var container = Xcrud.get_container(this);
                var data = Xcrud.list_data(container);
                Xcrud.request(container, data);
            });

            $(".xcrud").on("click", ".btn_search_values", function() {
                var r = $(this).closest(".xcrud-ajax").find(".search_values").attr();
                return false;
            });

            $(".xcrud").on("change", ".xcrud-daterange", function() {

                var container = Xcrud.get_container(this);
                if ($(this).val()) {
                    $(container).find(".xcrud-datepicker-from").datepicker("setDate", new Date(($(this).find('option:selected').data('from') + new Date().getTimezoneOffset() * 60) * 1000));
                    $(container).find(".xcrud-datepicker-to").datepicker("setDate", new Date(($(this).find('option:selected').data('to') + new Date().getTimezoneOffset() * 60) * 1000));
                } else {
                    $(container).find(".xcrud-datepicker-from,.xcrud-datepicker-to").val('');
                }
            });
            $(".xcrud").on("change", ".xcrud-columns-select", function() {
                var container = Xcrud.get_container(this);
                var type = $(this).children("option:selected").data('type');
                var fieldname = $(this).children("option:selected").val();
                Xcrud.change_filter(type, container, fieldname);
            });
            $(".xcrud").on("click", ".xcrud-action", function() {

                var confirm_text = $(this).data('confirm');
                if (confirm_text && !window.confirm(confirm_text)) {
                    return;
                } else {

                    //check if side panel is active

                    var container = Xcrud.get_container(this);
                    var data = Xcrud.list_data(container, this);
                    if ($(this).hasClass('xcrud-in-new-window')) {
                        Xcrud.new_window_request(container, data);
                    } else {
                        if (data.task == 'save') {
                            if (!Xcrud.validation_error) {
                                Xcrud.unique_check(container, data, function(container) {
                                    data.task = 'save';
                                    Xcrud.request(container, data);
                                });
                            } else {
                                Xcrud.show_message(container, Xcrud.lang('validation_error'), 'error');
                            }
                        } else {
                            Xcrud.request(container, data);
                        }
                    }
                }
                return false;
            });
            $(".xcrud").on("click", ".xcrud-toggle-show", function() {
                var container = $(this).closest(".xcrud").find(".xcrud-container:first");
                var closed = $(this).hasClass("xcrud-toggle-down");
                if (closed) {
                    $(container).stop(true, true).delay(100).slideDown(200, function() {
                        $(document).trigger("xcrudslidedown");
                        $(container).trigger("xcrudslidedown");
                    });
                    //$(this).removeClass("xcrud-toggle-down");
                    //$(this).addClass("xcrud-toggle-up");
                    $(this).closest(".xcrud").find(".xcrud-main-tab").slideUp(200);
                } else {
                    $(container).stop(true, true).slideUp(200, function() {
                        $(document).trigger("xcrudslideup");
                        $(container).trigger("xcrudslideup");
                    });
                    //$(this).removeClass("xcrud-toggle-up");
                    //$(this).addClass("xcrud-toggle-down");
                    $(this).closest(".xcrud").find(".xcrud-main-tab").delay(100).slideDown(200);
                }
                return false;
            });

            $(".xcrud").on("keypress", ".xcrud-input", function(e) {
                return Xcrud.pattern_callback(e, this);
            });
            $(".xcrud").on("click", ".xcrud-search-toggle", function() {
                $(this).hide(200);
                $(this).closest(".xcrud-ajax").find(".xcrud-search").show(200);
                return false;
            });

            $(".xcrud").on("click", ".xcrud-advanced-search-toggle", function() {
                //$(this).hide(200);
                if ($(this).closest(".xcrud-ajax").find(".xcrud-advanced-search").is(":visible")) {
                    $(this).closest(".xcrud-ajax").find(".xcrud-advanced-search").hide(200);

                } else {
                    $(this).closest(".xcrud-ajax").find(".xcrud-advanced-search").show(200);

                }
                return false;
            });

            $(".xcrud").on("keydown", ".xcrud-searchdata", function(e) {
                if (e.which == 13) {

                    var container = Xcrud.get_container(this);
                    var data = Xcrud.list_data(container);
                    data.search = 1;
                    Xcrud.request(container, data);
                    return false;
                }
            });

            $(".xcrud").on("change", ".xcrud-searchdata", function() {

               
                /*var container = Xcrud.get_container(this);
                var data = Xcrud.list_data(container);
                data.search = 1;
                Xcrud.request(container, data);
                return false;*/

            });

            $(".xcrud").on("change", ".xcrud-upload", function() {
                var container = Xcrud.get_container(this);
                var data = Xcrud.list_data(container);
                Xcrud.upload_file(this, data, container);
                return false;
            });
            $(".xcrud").on("click", ".xcrud-remove-file", function() {
                var container = Xcrud.get_container(this);
                var data = Xcrud.list_data(container);
                Xcrud.remove_file(this, data, container);
                return false;
            });
            $(".xcrud").on("click", ".xcrud_modal", function() {
                var content = $(this).data("content");
                var header = $(this).data("header");
                Xcrud.modal(header, content);
                return false;
            });


            $(".xcrud-ajax").each(function() {

                Xcrud.init_datepicker(this);
                Xcrud.init_datepicker_range($(this).find('.xcrud-columns-select option:selected').data('type'), this);
                Xcrud.depend_init(this);
                Xcrud.display_logic_init(this);
                Xcrud.disable_logic_init(this);
                Xcrud.readonly_logic_init(this);
                Xcrud.map_init(this);
                Xcrud.check_fixed_buttons();
                Xcrud.init_tooltips(this);
                Xcrud.init_tabs(this);
                Xcrud.check_message(this);
                Xcrud.hide_progress(this);
                Xcrud.initializeMultiSelect();
                Xcrud.init_flatpickr();

            });
        }

    },
    init_texteditor: function(container) {
        var elements = $(container).find(".xcrud-texteditor:not(.editor-loaded)");
        if ($(elements).length) {
            if (Xcrud.config('editor_url') || Xcrud.config('force_editor')) {
                $(elements).addClass("editor-loaded").addClass("editor-instance");
                if (Xcrud.config('editor_init_url')) {
                    window.setTimeout(function() {
                        $.ajax({
                            url: Xcrud.config('editor_init_url'),
                            type: "get",
                            dataType: "script",
                            success: function(js) {
                                $(".xcrud-overlay").stop(true, true).css("display", "none");
                                $(elements).removeClass("editor-instance");
                            },
                            cache: true
                        });
                    }, 300);
                } else {
                    if (typeof(tinyMCE) != 'undefined') {
                        tinyMCE.init({
                            mode: "textareas",
                            editor_selector: "editor-instance",
                            height: "250"
                        });
                    } else if (typeof(CKEDITOR) != 'undefined') {
                        CKEDITOR.replaceAll('editor-instance');
                    }
                    $(elements).removeClass("editor-instance");
                }
            }
        }
    },
    upload_file: function(element, data, container) {
        var upl_container = $(element).closest('.xcrud-upload-container');
        data.field = $(element).data("field");
        data.oldfile = $(upl_container).find('.xcrud-input').val();
        data.task = "upload";
        data.type = $(element).data("type");
        var ext = Xcrud.get_extension($(element).val());
        if (data.type == 'image') {
            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'jpeg':
                case 'gif':
                case 'png':
                    break;
                case 'svg':
                   break;
                default:
                    Xcrud.show_message(container, Xcrud.lang('image_type_error'), 'error');
                    $(element).val('');
                    return false;
                    break;
            }
        } else if (data.type == 'video') {
            switch (ext.toLowerCase()) {
                case 'mp4':
                case 'x-m4v':
                case 'mov':
                case 'avi':
                    break;
                default:
                    Xcrud.show_message(container, Xcrud.lang('video_type_error'), 'error');
                    $(element).val('');
                    return false;
                    break;
            }
        }
        $(document).trigger("xcrudbeforeupload", [container, data]);
        Xcrud.show_progress(container);
        $.ajaxFileUpload({
            secureuri: false,
            fileElementId: $(element).attr('id'),
            data: {
                "xcrud": data
            },
            url: Xcrud.config('url'),
            success: function(out) {
                Xcrud.hide_progress(container);
                $(upl_container).replaceWith(out);
                var status = Xcrud.check_message(container);
                $(document).trigger("xcrudafterupload", [container, data, status]);
                var crop_img = $(out).find("img.xcrud-crop");
                if ($(crop_img).length) {
                    Xcrud.show_crop_window(crop_img, container);
                }
            },
            error: function() {
                Xcrud.hide_progress(container);
                Xcrud.show_message(container, Xcrud.lang('undefined_error'), 'error');
            }
        });
    },
    show_crop_window: function(crop_img, container) {
        var upl_container = $(container).find('img.xcrud-crop').closest('.xcrud-upload-container');
        $(crop_img).dialog({
            resizable: false,
            height: 'auto',
            width: 'auto',
            modal: true,
            closeOnEscape: false,
            buttons: {
                "OK": function() {
                    var data = Xcrud.list_data(container, { "task": "crop_image" });
                    $(upl_container).find('.xrud-crop-data').each(function() {
                        data[$(this).attr('name')] = $(this).val();
                    });
                    //data.task = "crop_image";
                    $(document).trigger("xcrudbeforeecrop", [container, data]);
                    Xcrud.show_progress(container);
                    $.ajax({
                        data: {
                            "xcrud": data
                        },
                        success: function(out) {
                            Xcrud.hide_progress(container);
                            $(upl_container).replaceWith(out);
                            $(document).trigger("xcrudaftercrop", [container, data]);
                        },
                        error: function() {
                            Xcrud.hide_progress(container);
                            Xcrud.show_message(container, Xcrud.lang('undefined_error'), 'error');
                        },
                        type: "post",
                        url: Xcrud.config('url'),
                        dataType: "html",
                        cache: false,
                    });
                    $(this).dialog("destroy");
                    $(".xcrud-crop").remove();
                }
            },
            close: function(event, ui) {
                var data = Xcrud.list_data(container, { "task": "crop_image" });
                $(upl_container).find('.xrud-crop-data').each(function() {
                    data[$(this).attr('name')] = $(this).val();
                });
                //data.task = "crop_image";
                data.w = 0;
                data.h = 0;
                Xcrud.show_progress(container);
                $.ajax({
                    data: {
                        "xcrud": data
                    },
                    success: function(out) {
                        Xcrud.hide_progress(container);
                        $(upl_container).replaceWith(out);
                    },
                    error: function() {
                        Xcrud.hide_progress(container);
                        Xcrud.show_message(container, Xcrud.lang('undefined_error'), 'error');
                    },
                    type: "post",
                    url: Xcrud.config('url'),
                    dataType: "html",
                    cache: false,
                });
                $(this).dialog("destroy");
                $(".xcrud-crop").remove();
            },
            open: function(event, ui) {
                Xcrud.load_image(crop_img.attr('src'), function(imageObject) {
                    var t_w = parseInt($(crop_img).data('width'));
                    var t_h = parseInt($(crop_img).data('height'));
                    var ratio = parseFloat($(crop_img).data('ratio'));
                    var cropset = {};
                    cropset.boxWidth = t_w;
                    cropset.boxHeight = t_h;
                    if (t_h > 500) {
                        cropset.boxHeight = 500;
                        cropset.boxWidth = Math.round(t_w * 500 / t_h)
                    }
                    if (cropset.boxWidth > 550) {
                        cropset.boxWidth = 550;
                        cropset.boxHeight = Math.round(t_h * 550 / t_w);
                    }
                    var left = Math.round(($(window).width() - cropset.boxWidth - 10) / 2);
                    var top = Math.round(($(window).height() - cropset.boxHeight - 75) / 2);
                    $(".ui-dialog.ui-widget").css({
                        "position": "fixed",
                        "left": left + "px",
                        "top": top + "px"
                    });
                    cropset.minSize = [50, 50];
                    if (ratio) {
                        cropset.aspectRatio = ratio;
                    }
                    cropset.onChange = Xcrud.get_coordinates;
                    cropset.keySupport = false;
                    cropset.trueSize = [t_w, t_h];
                    var w1 = t_w / 4;
                    var h1 = t_h / 4;
                    var w2 = w1 * 3;
                    var h2 = h1 * 3;
                    cropset.setSelect = [w1, h1, w2, h2];
                    cropset.allowSelect = false;
                    $(".ui-dialog img.xcrud-crop").Jcrop(cropset);
                });
            }
        });
    },
    load_image: function(url, callback) {
        var imageObject = new Image();
        imageObject.src = url;
        if (imageObject.complete) {
            if (callback) {
                callback(imageObject);
            }
        } else {
            $(document).trigger("startload");
            imageObject.onload = function() {
                $(document).trigger("stopload");
                if (callback) {
                    callback(imageObject);
                }
            }
            imageObject.onerror = function() {
                $(document).trigger("stopload");
                if (callback) {
                    callback(false);
                }
            }
        }
    },
    remove_file: function(element, data, container) {
        var upl_container = $(element).closest('.xcrud-upload-container');
        data.field = $(element).data("field");
        data.file = $(upl_container).find('.xcrud-input').val();
        data.task = "remove_upload";
        Xcrud.show_progress(container);
        $.ajax({
            data: {
                "xcrud": data
            },
            success: function(data) {
                Xcrud.hide_progress(container);
                $(upl_container).replaceWith(data);
            },
            type: "post",
            url: Xcrud.config('url'),
            dataType: "html",
            cache: false,
            error: function() {
                Xcrud.hide_progress(container);
                Xcrud.show_message(container, Xcrud.lang('undefined_error'), 'error');
            }
        });
    },
    get_coordinates: function(c) {
        $(".xcrud").find("input.xrud-crop-data[name=x]").val(Math.round(c.x));
        $(".xcrud").find("input.xrud-crop-data[name=y]").val(Math.round(c.y));
        $(".xcrud").find("input.xrud-crop-data[name=x2]").val(Math.round(c.x2));
        $(".xcrud").find("input.xrud-crop-data[name=y2]").val(Math.round(c.y2));
        $(".xcrud").find("input.xrud-crop-data[name=w]").val(Math.round(c.w));
        $(".xcrud").find("input.xrud-crop-data[name=h]").val(Math.round(c.h));
    },
    validation_required: function(val, length) {
        return $.trim(val).length >= length;
    },
    validation_pattern: function(val, pattern) {
        if (val === '') {
            return true;
        }
        switch (pattern) {
            case 'email':
                reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                return reg.test($.trim(val));
                break;
            case 'alpha':
                reg = /^([a-z])+$/i;
                return reg.test($.trim(val));
                break;
            case 'alpha_numeric':
                reg = /^([a-z0-9])+$/i;
                return reg.test($.trim(val));
                break;
            case 'alpha_dash':
                reg = /^([-a-z0-9_-])+$/i;
                return reg.test($.trim(val));
                break;
            case 'numeric':
                reg = /^[\-+]?[0-9]*(\.|\,)?[0-9]+$/;
                return reg.test($.trim(val));
                break;
            case 'integer':
                reg = /^[\-+]?[0-9]+$/;
                return reg.test($.trim(val));
                break;
            case 'decimal':
                reg = /^[\-+]?[0-9]+(\.|\,)[0-9]+$/;
                return reg.test($.trim(val));
                break;
            case 'point':
                reg = /^[\-+]?[0-9]+\.{0,1}[0-9]*\,[\-+]?[0-9]+\.{0,1}[0-9]*$/;
                return reg.test($.trim(val));
                break;
            case 'natural':
                reg = /^[0-9]+$/;
                return reg.test($.trim(val));
                break;
            default:
                reg = new RegExp(pattern);
                return reg.test($.trim(val));
                break;
        }
        return true;
    },
    pattern_callback: function(e, element) {
        var pattern = $(element).data('pattern');
        if (pattern) {
            var code = e.which;
            if (code < 32 || e.ctrlKey || e.altKey) return true;
            var val = String.fromCharCode(code);
            switch (pattern) {
                case 'alpha':
                    reg = /^([a-z])+$/i;
                    return reg.test(val);
                    break;
                case 'alpha_numeric':
                    reg = /^([a-z0-9])+$/i;
                    return reg.test(val);
                    break;
                case 'alpha_dash':
                    reg = /^([-a-z0-9_-])+$/i;
                    return reg.test(val);
                    break;
                case 'numeric':
                case 'integer':
                case 'decimal':
                case 'point':
                    reg = /^[0-9\.\,\-+]+$/;
                    return reg.test(val);
                    break;
                case 'natural':
                    reg = /^[0-9]+$/;
                    return reg.test(val);
                    break;
            }
        }
        return true;
    },
    validation_error: false,
    get_extension: function(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    },
    check_fixed_buttons: function() {
        $(".xcrud").each(function() {
            if ($(this).find(".xcrud-list:first").width() > $(this).find(".xcrud-list-container:first").width()) {
                var w = $(this).find(".xcrud-actions:not(.xcrud-fix):first").width();
                $(this).find(".xcrud-actions:not(.xcrud-fix):first").css({
                    "width": w,
                    "min-width": w
                });
                $(this).find(".xcrud-list:first .xcrud-actions.xcrud-fix:not(.xcrud-actions-fixed)").addClass("xcrud-actions-fixed");
            } else
                $(this).find(".xcrud-list:first .xcrud-actions").removeClass("xcrud-actions-fixed");
        });
    },
    block_query: {},
    display_logic_init: function(container) {
        //$(container).off('change');
        var dependencies = {};

        //started
        //$('.xcrud').on('change','.xcrud-input[data-display-logic-src]', function() { //On click

        $(container).find('.xcrud-input[data-display-logic-src]').each(function() {

                depend_on_ = $(this).attr("data-display-logic-src");
                //console.log("Parent",depend_on_);
                var dependval = $(this).val();

                $(container).find('.xcrud-input[data-display-logic="' + depend_on_ + '"]').each(function(e) {

                    var $currentElement = $(this);
                    id = $currentElement.attr("id");
                    depend_on = $currentElement.attr("data-display-logic");
                    data_operator = $currentElement.attr("data-operator");
                    data_depend_value = $currentElement.attr("data-depend-value");
                    /*console.log("depend on ",depend_on);
                    console.log("depend on_ ",depend_on_);                   
                    console.log("depend operator ",data_operator);
                    console.log("depend value ",data_depend_value); */ 

                      //console.log(id + "clicked.." + data_operator + "..." + data_depend_value + "..." + dependval);
                      if (Xcrud.check_container(this, container)) {

                          $display = false;
                          if(data_operator == "="){
                              if(data_depend_value == dependval){
                                 $display = true;
                              }
                          }

                          if(data_operator == ">"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }
                          if(data_operator == ">="){
                              if(dependval  >=  data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<="){
                              if(dependval >= data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "!="){
                              if(data_depend_value != dependval){
                                 $display = true;
                              }
                          }

                          if($display){
                            //console.log($currentElement);
                            $currentElement.hide();
                            var $parentFormGroup = $currentElement.closest('.form-group');
                            $parentFormGroup.hide();
                          }else{
                            $currentElement.show();
                            var $parentFormGroup = $currentElement.closest('.form-group');
                            $parentFormGroup.show();
                          }
                    }
                });
            });



        //started
        $(container).on('change','.xcrud-input[data-display-logic-src]', function() { //On click

                depend_on_ = $(this).attr("data-display-logic-src");
                var dependval = $(this).val();

                $(container).find('.xcrud-input[data-display-logic="' + depend_on_ + '"]').each(function(e) {

                    var $currentElement = $(this);
                    id = $currentElement.attr("id");
                    depend_on = $currentElement.attr("data-display-logic");
                    data_operator = $currentElement.attr("data-operator");
                    data_depend_value = $currentElement.attr("data-depend-value");
                      /*console.log("depend on ",depend_on);
                      console.log("depend on_ ",depend_on_);                   
                      console.log("depend operator ",data_operator);
                      console.log("depend value ",data_depend_value);   
                      console.log(id + "clicked.." + data_operator + "..." + data_depend_value + "..." + dependval);*/

                      if (Xcrud.check_container(this, container)) {

                          $display = false;
                          if(data_operator == "="){
                              if(data_depend_value == dependval){
                                 $display = true;
                              }
                          }

                          if(data_operator == ">"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }
                          if(data_operator == ">="){
                              if(dependval  >=  data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<="){
                              if(dependval >= data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "!="){
                              if(data_depend_value != dependval){
                                 $display = true;
                              }
                          }

                          if($display){
                            //console.log($currentElement);
                            $currentElement.hide();
                            var $parentFormGroup = $currentElement.closest('.form-group');
                            $parentFormGroup.hide();
                          }else{
                            $currentElement.show();
                            var $parentFormGroup = $currentElement.closest('.form-group');
                            $parentFormGroup.show();
                          }
                    }
                });
            });
    },
    readonly_logic_init: function(container) {
        //$(container).off('change');
        var dependencies = {};

        //started
        //$('.xcrud').on('change','.xcrud-input[data-display-logic-src]', function() { //On click

        $(container).find('.xcrud-input[data-readonly-logic-src]').each(function() {

                depend_on_ = $(this).attr("data-readonly-logic-src");
                //console.log("Parent",depend_on_);
                var dependval = $(this).val();

                $(container).find('.xcrud-input[data-readonly-logic="' + depend_on_ + '"]').each(function(e) {

                    var $currentElement = $(this);
                    id = $currentElement.attr("id");
                    depend_on = $currentElement.attr("data-readonly-logic");
                    data_operator = $currentElement.attr("data-operator");
                    data_depend_value = $currentElement.attr("data-depend-value");

                    /*console.log("depend on ",depend_on);
                    console.log("depend on_ ",depend_on_);                   
                    console.log("depend operator ",data_operator);
                    console.log("depend value ",data_depend_value);   
                    console.log(id + "clicked.." + data_operator + "..." + data_depend_value + "..." + dependval);
                    */

                    if (Xcrud.check_container(this, container)) {

                          $display = false;
                          if(data_operator == "="){
                              if(data_depend_value == dependval){
                                 $display = true;
                              }
                          }

                          if(data_operator == ">"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }
                          if(data_operator == ">="){
                              if(dependval  >=  data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<="){
                              if(dependval >= data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "!="){
                              if(data_depend_value != dependval){
                                 $display = true;
                              }
                          }

                          if($display){
                           
                            //var $parentFormGroup = $currentElement.closest('.form-group');
                            //$parentFormGroup.hide();

                            $currentElement.prop('readonly', true); 
                          }else{
                            $currentElement.prop('readonly', false); 
                          }
                    }
                });
            });



        //started
        $(container).on('change','.xcrud-input[data-readonly-logic-src]', function() { //On click

                depend_on_ = $(this).attr("data-readonly-logic-src");
                var dependval = $(this).val();

                $(container).find('.xcrud-input[data-readonly-logic="' + depend_on_ + '"]').each(function(e) {

                    var $currentElement = $(this);
                    id = $currentElement.attr("id");
                    depend_on = $currentElement.attr("data-readonly-logic");
                    data_operator = $currentElement.attr("data-operator");
                    data_depend_value = $currentElement.attr("data-depend-value");

                    /*console.log("depend on ",depend_on);
                    console.log("depend on_ ",depend_on_);                   
                    console.log("depend operator ",data_operator);
                    console.log("depend value ",data_depend_value);   
                    console.log(id + "clicked.." + data_operator + "..." + data_depend_value + "..." + dependval);
                    */

                    if (Xcrud.check_container(this, container)) {

                          $display = false;
                          if(data_operator == "="){
                              if(data_depend_value == dependval){
                                 $display = true;
                              }
                          }

                          if(data_operator == ">"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }
                          if(data_operator == ">="){
                              if(dependval  >=  data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<="){
                              if(dependval >= data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "!="){
                              if(data_depend_value != dependval){
                                 $display = true;
                              }
                          }

                          if($display){
                           
                            //var $parentFormGroup = $currentElement.closest('.form-group');
                            //$parentFormGroup.hide();
                            
                            $currentElement.prop('readonly', true); 
                          }else{
                            $currentElement.prop('readonly', false); 
                          }
                    }
                });
            });
    },
    disable_logic_init: function(container) {
        //$(container).off('change');
        var dependencies = {};

        //started
        //$('.xcrud').on('change','.xcrud-input[data-display-logic-src]', function() { //On click

        $(container).find('.xcrud-input[data-disable-logic-src]').each(function() {

                depend_on_ = $(this).attr("data-disable-logic-src");
                //console.log("Parent",depend_on_);
                var dependval = $(this).val();

                $(container).find('.xcrud-input[data-disable-logic="' + depend_on_ + '"]').each(function(e) {

                    var $currentElement = $(this);
                    id = $currentElement.attr("id");
                    depend_on = $currentElement.attr("data-disable-logic");
                    data_operator = $currentElement.attr("data-operator");
                    data_depend_value = $currentElement.attr("data-depend-value");

                    /*console.log("depend on ",depend_on);
                      console.log("depend on_ ",depend_on_);                   
                      console.log("depend operator ",data_operator);
                      console.log("depend value ",data_depend_value);   */
                      //if(depend_on == depend_on_){
                      //console.log(id + "clicked.." + data_operator + "..." + data_depend_value + "..." + dependval);
                      if (Xcrud.check_container(this, container)) {

                          $display = false;
                          if(data_operator == "="){
                              if(data_depend_value == dependval){
                                 $display = true;
                              }
                          }

                          if(data_operator == ">"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }
                          if(data_operator == ">="){
                              if(dependval  >=  data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<="){
                              if(dependval >= data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "!="){
                              if(data_depend_value != dependval){
                                 $display = true;
                              }
                          }

                          if($display){                        
                            //var $parentFormGroup = $currentElement.closest('.form-group');
                            //$parentFormGroup.hide();
                            $currentElement.prop('disabled', true); 
                          }else{
                            $currentElement.prop('disabled', false); 
                          }
                     // }
                    }
                });
            });



        //started
        $(container).on('change','.xcrud-input[data-disable-logic-src]', function() { //On click

                depend_on_ = $(this).attr("data-disable-logic-src");
                var dependval = $(this).val();

                $(container).find('.xcrud-input[data-disable-logic="' + depend_on_ + '"]').each(function(e) {

                    var $currentElement = $(this);
                    id = $currentElement.attr("id");
                    depend_on = $currentElement.attr("data-disable-logic");
                    data_operator = $currentElement.attr("data-operator");
                    data_depend_value = $currentElement.attr("data-depend-value");

                    /*console.log("depend on ",depend_on);
                    console.log("depend on_ ",depend_on_);                   
                    console.log("depend operator ",data_operator);
                    console.log("depend value ",data_depend_value);   
                    console.log(id + "clicked.." + data_operator + "..." + data_depend_value + "..." + dependval);
                    */

                      if (Xcrud.check_container(this, container)) {

                          $display = false;
                          if(data_operator == "="){
                              if(data_depend_value == dependval){
                                 $display = true;
                              }
                          }

                          if(data_operator == ">"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }
                          if(data_operator == ">="){
                              if(dependval  >=  data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<"){
                              if(dependval > data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "<="){
                              if(dependval >= data_depend_value){
                                 $display = true;
                              }
                          }

                          if(data_operator == "!="){
                              if(data_depend_value != dependval){
                                 $display = true;
                              }
                          }

                          if($display){
                           
                            //var $parentFormGroup = $currentElement.closest('.form-group');
                            //$parentFormGroup.hide();
                            $currentElement.prop('disabled', true); 
                          }else{
                            $currentElement.prop('disabled', false); 
                          }
                      }
                });
            });
    },
    depend_init: function(container) {
        $(container).off('change.depend');
        var dependencies = {};
        $(container).find('.xcrud-input[data-depend]').each(function() {
            var container = Xcrud.get_container(this);
            var data = Xcrud.list_controls_data(container, this);
            var depend_on = $(this).data("depend");
            data.task = "depend";
            data.name = $(this).attr('name');
            data.value = $(this).val();
            $(container).on('change.depend', '.xcrud-input[name="' + depend_on + '"]', function() {
                if (Xcrud.check_container(this, container)) {
                    data.dependval = $(this).val();
                    Xcrud.depend_query(data, depend_on, container);
                }
            });
            if (depend_on) dependencies[depend_on] = depend_on;
        });
        $.map(dependencies, function(val, key) {
            window.setTimeout(function() {
                $(container).find('.xcrud-input[name="' + val + '"]:not([data-depend])').trigger('change.depend');
            }, 100);
        });
    },
    depend_query: function(data, depend_on, container) {
        if (Xcrud.block_query[data.name + depend_on]) {
            return;
        }
        Xcrud.block_query[data.name + depend_on] = 1;
        $(document).trigger("xcrudbeforedepend", [container, data]);
        $.ajax({
            data: {
                "xcrud": data
            },
            type: 'post',
            url: Xcrud.config('url'),
            success: function(input) {
                $(container).find('.xcrud-input[name="' + data.name + '"]').replaceWith(input);
                window.setTimeout(function() {
                    $(document).trigger("xcrudafterdepend", [container, data]);
                    $(container).find('.xcrud-input[name="' + data.name + '"]').trigger('change.depend');
                    Xcrud.block_query[data.name + depend_on] = 0;
                }, 50);
            },
            cache: false
        });
    },
    parse_latlng: function(string) {
        var coords = string.split(',');
        if (coords.length != 2) {
            return null;
        }
        var LatLng = new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
        return LatLng;
    },
    create_map: function(selector, center, zoom, type) {
        var params = {
            zoom: zoom,
            center: center,
            mapTypeId: google.maps.MapTypeId[type]
        }
        var map = new google.maps.Map($(selector)[0], params);
        return map;
    },
    place_marker: function(map, point, draggable, infowindow, point_field) {
        var marker = new google.maps.Marker({
            position: point,
            map: map,
            animation: google.maps.Animation.DROP,
            draggable: (draggable ? true : false)
        });
        if (infowindow) {
            google.maps.event.addListener(marker, 'click', function() {
                var currentmarker = this;
                var infoWindow = new google.maps.InfoWindow({
                    maxWidth: 320
                });
                infoWindow.setContent('<p class="xcrud-infowinow">' + infowindow + '</p>');
                infoWindow.open(map, currentmarker);
            });
        }
        if (draggable && $(point_field).length) {
            google.maps.event.addListener(marker, 'dragend', function() {
                $(point_field).val(this.getPosition().lat() + ',' + this.getPosition().lng());
            });
            google.maps.event.addListener(map, 'click', function(event) {
               
                marker.setPosition(event.latLng);
                $(point_field).val(marker.getPosition().lat() + ',' + marker.getPosition().lng());
            });
        }
        return marker;
    },
    move_marker: function(map, marker, point, dragable, infowindow) {
        if (marker) {
            marker.setPosition(point);
        } else {
            this.place_marker(map, point, dragable, infowindow)
        }
        map.setCenter(point);
        return marker;
    },
    find_point: function(address, callback) {
        return this.geocode({
            address: address
        }, callback);
    },
    find_address: function(point, callback) {
        return this.geocode({
            latLng: point
        }, callback);
    },
    geocode: function(geocoderRequest, callback, callback_single) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(geocoderRequest, function(results, status) {
            var output = {};
            if (status == google.maps.GeocoderStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i].formatted_address) {                   
                        output[i] = {};
                        output[i].lat = results[i].geometry.location.lat();
                        output[i].lng = results[i].geometry.location.lng();
                        output[i].address = results[i].formatted_address;
                        if (callback_single) {
                            return callback_single(output[i]);
                        }
                    }
                }
                if (callback) {
                    callback(output);
                }
            }
        });
    },
    map_instances: [],
    marker_instances: [],
    map_init: function(container) {
        Xcrud.map_instances = [];
        $(container).find('.xcrud-map').each(function() {
            var cont = this;
            var point_field = $(cont).parent().children('.xcrud-input');
            var search_field = $(cont).parent().children('.xcrud-map-search');
            var point = Xcrud.parse_latlng($(point_field).val());
            var map = Xcrud.create_map(cont, point, $(cont).data('zoom'), 'ROADMAP');
            var marker = Xcrud.place_marker(map, point, $(cont).data('draggable'), $(cont).data('text'), point_field);
            $(point_field).on("keyup", function() {
                var point = Xcrud.parse_latlng($(point_field).val());
                Xcrud.move_marker(map, marker, point, $(cont).data('draggable'), $(cont).data('text'));
                return false;
            });
            if ($(search_field).length) {
                $(search_field).on("keyup", function() {
                    var value = $.trim($(search_field).val());
                    if (value) {
                        Xcrud.find_point(value, function(results) {
                            Xcrud.map_dropdown(search_field, results, map, marker, point_field, cont);
                        });
                    }
                    return false;
                });
            }
            Xcrud.map_instances.push(map);
            Xcrud.marker_instances.push(marker);
        });
    },
    map_dropdown: function(element, results, map, marker, point_field, cont) {
        var m_left = $(element).outerWidth();
        var m_top = $(element).outerHeight();
        var pos = $(element).offset();
        $(element).prev(".xcrud-map-dropdown").remove();
        if (results) {
            var list = '<ul class="xcrud-map-dropdown">';
            $.map(results, function(value) {
                list += '<li data-val="' + value.lat + ',' + value.lng + '">' + value.address + '</li>';
            });
            list += '</ul>';
            $(element).before(list);
            $(element).prev(".xcrud-map-dropdown").offset(pos).css({
                "marginTop": m_top + "px",
                "minWidth": m_left + "px"
            }).children('li').on("click", function() {
                var point = Xcrud.parse_latlng($(this).data("val"));
                $(element).val($(this).text());
                marker = Xcrud.move_marker(map, marker, point, $(cont).data('draggable'), $(cont).data('text'));
                $(point_field).val(marker.getPosition().lat() + ',' + marker.getPosition().lng());
                $(this).parent('ul').remove();
                return false;
            });
        }
    },
    map_resize_all: function() {
        if ($(".xcrud-map").length && Xcrud.map_instances.length) {
            for (i = 0; i < Xcrud.map_instances.length; i++) {
                var map = Xcrud.map_instances[i];
                var marker = Xcrud.marker_instances[i];
                google.maps.event.trigger(map, 'resize');
                map.setZoom(map.getZoom());
                map.setCenter(marker.position)
            }
        }
    },
    reload: function(selector_or_object, reload_after_ = true) {
        if (!selector_or_object) {
            selector_or_object = 'body';
        }
        $(selector_or_object).find(".xcrud-ajax").each(function() {
            Xcrud.request(this, Xcrud.list_data(this), function() {

            }, reload_after_);
        });
    },

    editMove: function(status) {

        var primaryKey = $('.xcrud-ajax').find("[name=primary]").val(); //$('.xcrud-ajax[name ="primary"]').val;
        primaryKey = parseInt(primaryKey);
        if (status == "next") {
            primaryKey = primaryKey + 1;
        } else if (status == "prev") {
            if (primaryKey != 1) {
                primaryKey = primaryKey - 1;
            }
        }

        Xcrud.request('.xcrud-ajax', Xcrud.list_data('.xcrud-ajax', { task: 'edit', primary: primaryKey }), function(response) {

        });
    },
    bootstrap_modal: function(header, content, e = "") {

        $("#xcrud-modal-window").remove();
        $("#xcrud-overlay").remove();

        $(".xcrud-ajax").append('<div id="xcrud-modal-window" class="ui modal"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
        $(e).closest(".xcrud-ajax").append('<div id="xcrud-modal-window" class="ui modal"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
        $("#xcrud-modal-window .modal-content").html('<div class="modal-header"><button type="button" class="closed" data-dismiss="modal" aria-hidden="true"><i class="fa fa-close icon-close"></i></button><h4 class="modal-title">' + header + '</h4></div>');
        $("#xcrud-modal-window .modal-content").append('<div class="modal-body">' + content + '</div>');
        $("#xcrud-modal-window").modal();
        $('#xcrud-modal-window [data-dismiss="modal"]').on("click", function(e) {

            if ($("#xcrud-modal-window").length) {
                var formField = $("#xcrud-modal-window").find("[name='key']").val();
                $(this).closest(".xcrud-ajax").find("[name='key']").val(formField);
                $(e).closest(".xcrud-ajax").find("[name='key']").val(formField);
            }


            $("#xcrud-modal-window").modal('hide');
            $("#xcrud-modal-window").removeClass("show");
            $("#xcrud-modal-window").hide();
            $("#xcrud-modal-window").remove();
            $("#xcrud-overlay").remove();
            $(".xcrud-overlay").remove();


            if ($(".simplemodal-close").length) { // joomla trick
                $(".simplemodal-close").trigger("click");
                $("#xcrud-modal-window").removeClass("show");
                $("#xcrud-modal-window").remove();
            }

            return false;
        });
        $('#xcrud-modal-window [data-bs-dismiss="modal"]').on("click", function(e) {

            if ($("#xcrud-modal-window").length) {
                var formField = $("#xcrud-modal-window").find("[name='key']").val();
                $(this).closest(".xcrud-ajax").find("[name='key']").val(formField);
            }

            $("#xcrud-modal-window").modal('hide');
            $("#xcrud-modal-window").removeClass("show");
            $("#xcrud-modal-window").hide();
            $("#xcrud-modal-window").remove();
            $("#xcrud-overlay").remove();
            $(".xcrud-overlay").remove();


            if ($(".simplemodal-close").length) { // joomla trick
                $(".simplemodal-close").trigger("click");
                $("#xcrud-modal-window").removeClass("show");
                $("#xcrud-modal-window").remove();
            }

            return false;
        });

        $('#xcrud-modal-window').on('hidden.bs.modal', function() {
            // do something…
            if ($("#xcrud-modal-window").length) {
                var formField = $("#xcrud-modal-window").find("[name='key']").val();
                $(this).closest(".xcrud-ajax").find("[name='key']").val(formField);
                $(".xcrud-ajax").find("[name='key']").val(formField);
                $(".xcrud-overlay").remove();
                //console.log($(this).parent().parent().parent().parent().parent().parent().closest(".xcrud-ajax"));
            }
        });

    },
    ui_modal: function(header, content, e = "") {
        /*jQuery("#xcrud-modal-window").remove();
        jQuery("body").append('<div id="xcrud-modal-window">' + content + '</div>');
        jQuery("#xcrud-modal-window").dialog({
        	resizable: false,
        	height: 'auto',
        	//appendTo: "#xcrud-ajax",
        	width: 'auto',
        	modal: true,
        	closeOnEscape: true,
        	close: function(event, ui) {
        		var container = Xcrud.get_container(this);
        		var data = Xcrud.list_data(container, this);
        		data.task = 'list';	
        		$(".xcrud-ajax").find("[name='key']").val(data.key);	
        		jQuery("#xcrud-modal-window").remove();
        	},
        	title: header
        });*/

        $("#xcrud-modal-window").remove();

        $(e).closest(".xcrud-ajax").append('<div id="xcrud-modal-window show">' + content + '</div>');
        $("#xcrud-modal-window").dialog({
            resizable: false,
            height: 'auto',
            appendTo: "#xcrud-ajax",
            //appendTo: ".xcrud-modal-holder",
            width: 'auto',
            modal: true,
            closeOnEscape: true,
            close: function(event, ui) {

                var container = Xcrud.get_container(this);
                var data = Xcrud.list_data(container, this);
                data.task = 'list';
                $(".xcrud-ajax").find("[name='key']").val(data.key);

            },
            title: header
        });

    },
    semantic_modal: function(header, content, e = "") {

        //console.log("bootstrap_modal");
        //$("#xcrud-modal-window").remove();
        //$("#xcrud-overlay").remove();

        $(".xcrud-ajax").append('<div id="xcrud-modal-window" class="ui modal"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
        //$(e).closest(".xcrud-ajax").append('<div id="xcrud-modal-window" class="ui modal"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
        $("#xcrud-modal-window .modal-content").html('<div class="modal-header"><button type="button" class="closed" data-dismiss="modal" aria-hidden="true"><i class="close icon"></i></button><h4 class="modal-title">' + header + '</h4></div>');
        $("#xcrud-modal-window .modal-content").append('<div class="modal-body xcrud-ajax">' + content + '</div>');

        $('#xcrud-modal-window').modal({
            onHide: function() {

                if ($("#xcrud-modal-window").length) {
                    var formField = $("#xcrud-modal-window").find("[name='key']").val();
                    $(this).closest(".xcrud-ajax").find("[name='key']").val(formField);
                    $(".xcrud-ajax").find("[name='key']").val(formField);

                    //console.log($(this).parent().parent().parent().parent().parent().parent().closest(".xcrud-ajax"));
                }

                //$("#xcrud-modal-window").remove();
                //$(".ui.dimmer.modals").remove();
            },
            onShow: function() {
                //$("#xcrud-modal-window").modal("show");
                $(".xcrud-action").off('click').on('click', function(e) {
                    //$(".xcrud-action").off.$(".xcrud-action").on("click", function(e) {
                    //check if side panel is active
                    //container = $('#xcrud-modal-window');
                    //var container = $("#xcrud-modal-window");
                    var container = Xcrud.get_container_find($("#xcrud-modal-window"));
                    var data = Xcrud.list_data(container, this);
                    if ($('#xcrud-modal-window').hasClass('xcrud-in-new-window')) {
                        Xcrud.new_window_request(container, data);
                    } else {
                        if (data.task == 'save') {
                            if (!Xcrud.validation_error) {
                                Xcrud.unique_check(container, data, function(container) {
                                    data.task = 'save';
                                    Xcrud.request(container, data);
                                });
                            } else {
                                Xcrud.show_message(container, Xcrud.lang('validation_error'), 'error');
                            }
                        } else {
                            //Xcrud.request(container, data);
                        }
                    }
                });
            }
        });

        Xcrud.init_datepicker($("#xcrud-modal-window"));
        Xcrud.init_datepicker_range($("#xcrud-modal-window").find('.xcrud-columns-select option:selected').data('type'), this);
        Xcrud.depend_init($("#xcrud-modal-window"));
        Xcrud.display_logic_init($("#xcrud-modal-window"));
        Xcrud.disable_logic_init($("#xcrud-modal-window"));
        Xcrud.readonly_logic_init($("#xcrud-modal-window"));
        
        
        Xcrud.map_init($("#xcrud-modal-window"));
        Xcrud.check_fixed_buttons();
        Xcrud.init_tooltips($("#xcrud-modal-window"));
        Xcrud.init_tabs($("#xcrud-modal-window"));
        Xcrud.check_message($("#xcrud-modal-window"));
        Xcrud.hide_progress($("#xcrud-modal-window"));

        //$("#xcrud-modal-window").modal();
        $('#xcrud-modal-window [data-dismiss="modal"]').on("click", function(e) {

            if ($("#xcrud-modal-window").length) {
                var formField = $("#xcrud-modal-window").find("[name='key']").val();
                $(this).closest(".xcrud-ajax").find("[name='key']").val(formField);
                $(".xcrud-ajax").find("[name='key']").val(formField);

                //console.log($(this).parent().parent().parent().parent().parent().parent().closest(".xcrud-ajax"));
            }

            $('#xcrud-modal-window').modal("hide");
            //$("#xcrud-modal-window").remove();
            //$(".ui.dimmer.modals").remove();
        });

        $('#xcrud-modal-window').on('hidden.bs.modal', function() {
            // do something…
            if ($("#xcrud-modal-window").length) {
                var formField = $("#xcrud-modal-window").find("[name='key']").val();
                $(this).closest(".xcrud-ajax").find("[name='key']").val(formField);
                $(".xcrud-ajax").find("[name='key']").val(formField);

                //console.log($(this).parent().parent().parent().parent().parent().parent().closest(".xcrud-ajax"));
            }
        });

        $("#xcrud-modal-window").modal('show');
        //console.log("init controls");
        //Xcrud.init_actions($("#xcrud-modal-window"));
        //Xcrud.init_actions();

    },
    ui_modal: function(header, content, e = "") {
        /*jQuery("#xcrud-modal-window").remove();
        jQuery("body").append('<div id="xcrud-modal-window">' + content + '</div>');
        jQuery("#xcrud-modal-window").dialog({
        	resizable: false,
        	height: 'auto',
        	//appendTo: "#xcrud-ajax",
        	width: 'auto',
        	modal: true,
        	closeOnEscape: true,
        	close: function(event, ui) {
        		var container = Xcrud.get_container(this);
        		var data = Xcrud.list_data(container, this);
        		data.task = 'list';	
        		$(".xcrud-ajax").find("[name='key']").val(data.key);	
        		jQuery("#xcrud-modal-window").remove();
        	},
        	title: header
        });*/

        $("#xcrud-modal-window").remove();

        $(e).closest(".xcrud-ajax").append('<div id="xcrud-modal-window show">' + content + '</div>');
        $("#xcrud-modal-window").dialog({
            resizable: false,
            height: 'auto',
            appendTo: "#xcrud-ajax",
            //appendTo: ".xcrud-modal-holder",
            width: 'auto',
            modal: true,
            closeOnEscape: true,
            close: function(event, ui) {

                var container = Xcrud.get_container(this);
                var data = Xcrud.list_data(container, this);
                data.task = 'list';
                $(".xcrud-ajax").find("[name='key']").val(data.key);

            },
            title: header
        });

    },
    modal: function(header, content, e = "") {
        content = '<span>' + content + '</span>';
        //alert(typeof($.fn.modal));

        if (Xcrud.config('theme') == 'semantic') {

            if ($(content).first().prop("tagName") == 'IMG') {
                Xcrud.load_image($(content).first().attr('src'), function(imgObj) {
                    Xcrud.semantic_modal(header, content, e);
                })
            } else {
                Xcrud.semantic_modal(header, content, e);
            }

        } else {
            if (typeof($.fn.modal) != 'undefined') {

                if ($(content).first().prop("tagName") == 'IMG') {
                    Xcrud.load_image($(content).first().attr('src'), function(imgObj) {
                        Xcrud.bootstrap_modal(header, content, e);
                    })
                } else {
                    Xcrud.bootstrap_modal(header, content, e);
                }
            } else {

                if ($(content).first().prop("tagName") == 'IMG') {
                    Xcrud.load_image($(content).first().attr('src'), function(imgObj) {
                        Xcrud.ui_modal(header, content, e);
                    })
                } else {
                    Xcrud.ui_modal(header, content, e);
                }
            }
        }

        $("#xcrud-modal-window").show();
        $(".xcrud-overlay").show();
        $("#xcrud-modal-window").modal('show');

    },
    set_tab_buttons: function(tab_index, button_html, position = "top") { //position can be top or bottom

        $(".tab-pane.active").append(button_html);

    },
    init_tabs: function(container) {

        if (Xcrud.config('theme') == 'semantic') {
            $('.xcrud-tabs .menu .item').tab('change tab', 'tab1.php');
        } else {
            $(container).find('.xcrud-tabs').tabs({
                activate: function(event, ui) {
                    //console.log(ui.newTab.index());
                    //Xcrud.map_resize_all();
                }
            });
        }

        //$('.xcrud-tabs .menu .item').tab('change tab', 'tab1.php');

        if ($(container).find('.xcrud-tabs').length) {
            if (typeof($.fn.tab) != 'undefined') {
                //$("h2:contains(Bills)").append('<button class="btn btn-primary" onclick="makePayment();">Pay/Generate Receipt to Selected Items</button>');

                $(container).find('.xcrud-tabs > ul:first > li > a').on("click", function(event, ui) {
                    /*console.log(event);
                    console.log($(".xcrud-tabs").tabs('option', 'selected'));
                    console.log($(".xcrud-tabs").tabs().tabs('option', 'active'));
                    $("ul.tabs").tabs().tabs($("div.panes > div"), action);
                    console.log(ui.newTab.index());
                    $(this).tab('show');
                    console.log($(".xcrud-tabs").tabs('option', 'active'));
                    var tabPos = $(container).find('.xcrud-tabs > ul:first > li.active').index();
                    console.log(tabPos);
                    var instanceVal = $(container).closest(".xcrud-ajax").find("[name=instance]").val();
                    console.log(instanceVal);
                    Xcrud.current_tab = $('li.active > .nav-item').attr("tab-name");*/

                    // return false;

                });
                $('.xcrud .nav-tabs a').on('shown.bs.tab', function(e) {
                    Xcrud.map_resize_all();
                });
            } else {
                //alert("ss");
                $(container).find('.xcrud-tabs').tabs({
                    activate: function(event, ui) {
                        //console.log(ui.newTab.index());
                        Xcrud.map_resize_all();
                    }
                });
            }
        }
    },
    renderInlineFunctionality: function(e) {

        var identifier = $(e).attr("identifier");
        if (identifier) {
            var fields = identifier.split('-');
            var clickedCell = e;

            var field = fields[0];
            var primary = fields[1];
            var clicks = fields[2];
            var save = fields[3];

            var instanceVal = $(e).closest(".xcrud-ajax").find("[name=instance]").val();
            var instanceKey = $(e).closest(".xcrud-ajax").find("[name=key]").val();

            //var classList = $(time).attr('class').split(/\s+/);	     
            var isActionsCell = false; //checks if to go ahead with inline edit

            if ($(e).parent().find('.xcrud-input').length == 1) {
                isActionsCell = true;
            }

            if (!isActionsCell) {

                var primaryKey = primary;
                var order_by = field;

                //console.log("length>>" + $('.xcrud-ajax').find("[data-task=save]").length);
                //if($(this).closest(".xcrud-ajax").find("[data-task=save]").length < 1){				
                Xcrud.request_inline_edit('.xcrud-ajax', Xcrud.list_data('.xcrud-ajax', { key: instanceKey, instance: instanceVal, primary: primaryKey, task: 'edit', editmode: 'inline', field: order_by }), e, function(response) {

                    if (response != "") {

                        $(clickedCell).html(response);
                        Xcrud.initializeInline(clickedCell);
                        Xcrud.init_datepicker(clickedCell);
                        Xcrud.init_texteditor(clickedCell);
                        Xcrud.init_datepicker_range($(clickedCell).find('.xcrud-columns-select option:selected').data('type'), clickedCell);
                        Xcrud.depend_init(clickedCell);
                        Xcrud.display_logic_init(clickedCell);
                        Xcrud.disable_logic_init(clickedCell);
                        Xcrud.readonly_logic_init(clickedCell);
                        Xcrud.map_init(clickedCell);
                        Xcrud.check_fixed_buttons();
                        Xcrud.init_tooltips(clickedCell);
                        Xcrud.init_tabs(clickedCell);
                        Xcrud.renderCheckboxes(clickedCell);

                        try {
                            $('.xcrud-input').focus();
                            $('.xcrud-input').focusout(function() {
                                //$(this).parent().find("[data-task=save]").click();	
                                //$(e).parent().find("[data-task=save]").click();
                            });
                        } catch (e) {

                        }

                        $('.xcrud-input').keypress(function(event) {
                            var keycode = (event.keyCode ? event.keyCode : event.which);
                            if (keycode == '13') {
                                if (save == "enter_only" || save == "enter_button_only") {
                                    $(e).parent().find("[data-task=save]").click();
                                    event.preventDefault();
                                    return false;
                                } else {
                                    return false;
                                }

                            }
                        });

                    }
                });

            }
        }
    },
    renderCheckboxes: function(container) {
        if ($(container).find('.xcrud-bulk-checkbox').length) {

            //select idividually
            $(".xcrud-bulk-checkbox").change(function() {
                if ($(this).prop("checked")) {
                    items.push($(this).val());
                } else {
                    Xcrud.removeItemOnce(items, this.value);
                }

            });

            //Bulk select from header
            $(".xcrud-bulk-checkbox-main").change(function() {
                var mainChecked = $(this).prop("checked");
                $('.xcrud-bulk-checkbox').each(function() {
                    $(this).prop("checked", mainChecked);
                    if (mainChecked) {
                        items.push($(this).val());
                    } else {
                        Xcrud.removeItemOnce(items, this.value);
                    }
                });
            });

            $('.xcrud-bulk-checkbox').each(function() {
                if (items.includes(this.value)) {
                    $(this).prop("checked", true);
                }
            });




        }
    },
    init_tooltips: function(container) {
        if ($(container).find('.xcrud-tooltip').length) {
            $(container).find('.xcrud-tooltip').tooltip();
        }
    },
    show_message: function(container, text, classname, delay) {

        //alert("dsafsasfdasf");
        if (container && text) {

            /*if (!classname) classname = 'info';
            if (!delay) delay = 7;
            var cont = $(container).closest(".xcrud-container");
            $(cont).children('.xcrud-message').stop(true, true).remove();
            $(cont).append('<div class="xcrud-message ' + (classname ? classname : '') + '">' + text + '</div>');
            $(cont).children('.xcrud-message').on("click", function() {
            	$(this).stop(true).slideUp(200, function() {
            		$(this).remove();
            	});
            }).slideDown().delay(delay * 1000).slideUp(200, function() {
            	$(this).remove();
            });*/

            if (Xcrud.config('activate_toast_alerts') == true) {

                if (classname == "error") {
                    Xcrud.showToastMsg(text, Xcrud.config('toast_error_color'), 10000);
                } else {
                    Xcrud.showToastMsg(text, Xcrud.config('toast_success_color'), 10000);
                }
                //Xcrud.showToastMsg(text,color,duration){

            } else {

                if (Xcrud.config('theme') == 'default' || Xcrud.config('theme') == 'minimal') {
                    if (!classname) classname = 'info';
                    if (!delay) delay = 20;
                    var cont = $(container).closest(".xcrud-container");
                    $(cont).children('.xcrud-message').stop(true, true).remove();
                    $(cont).append('<div class="xcrud-message ' + (classname ? classname : '') + '">' + text + '</div>');
                    $(cont).children('.xcrud-message').on("click", function() {
                        $(this).stop(true).slideUp(200, function() {
                            $(this).remove();
                        });
                    }).slideDown().delay(delay * 1000).slideUp(200, function() {
                        $(this).remove();
                    });
                }

                if (Xcrud.config('theme') == 'bootstrap' || Xcrud.config('theme') == 'bootstrap4') {
                    if (!classname) classname = 'info';
                    if (!delay) delay = 20;
                    var cont = $(container).closest(".xcrud-container");
                    $(cont).children('.xcrud-message-elem').stop(true, true).remove();
                    if (classname == "error") {
                        classname = "alert-danger";
                    }
                    $(cont).append('<div style="position:absolute;top:0;width:100%;" class="alert alert-success xcrud-message-elem ' + (classname ? classname : '') + '" role="alert">' + text + '</div>');
                    $(cont).children('.xcrud-message-elem').on("click", function() {
                        $(this).stop(true).slideUp(200, function() {
                            $(this).remove();
                        });
                    }).slideDown().delay(delay * 1000).slideUp(200, function() {
                        $(this).remove();
                    });
                }
            }




        }
    },
    check_script: function(container) {
        var elements = $(container).find(".xcrud-callback-script");
        if ($(elements).length) {
            window.location = $(".xcrud-callback-script").val();
        }
    },
    check_message: function(container) {
        var status = 'success';
        var elements = $(container).find(".xcrud-callback-message");
        if ($(elements).length) {
            elements.each(function() {
                var element = $(this);
                if (Xcrud.check_container(element, container)) {
                    Xcrud.show_message(container, element.val(), element.attr("name"));
                    if (element.attr("name") != 'success') {
                        var status = element.attr("name");
                    }
                    element.remove();
                }
            });
        }
        return status;
    },
    showToastMsg: function(message, color, duration) {
        Toastify({
            text: message,
            duration: duration,
            gravity: "bottom", // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            backgroundColor: color,
        }).showToast();
    },
    removeItemOnce: function(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    },
    formatPrice: function(input) {
        // Remove non-numeric characters
        let value = input.value.replace(/[^\d.]/g, '');
  
        // Split the value into integer and decimal parts
        let parts = value.split('.');
  
        // Add commas for thousands separator
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
        // Reconstruct the value with commas
        value = parts.join('.');
  
        // Update the input value
        input.value = value;
    },
    initializeInline: function() {

        $('.xcrud-list td, .xcrud-row span').off('click').on('click', function(event) {
            if (!event.detail || event.detail == 1) {
                //validate to check if another field is being edited
                if ($('.xcrud-list .xcrud-input').length == 0) {

                    var clickedCell = this;
                    var identifier = $(this).attr("identifier");

                    if (identifier) {

                        var fields = identifier.split('-');
                        var clicks = fields[2];
                        if (clicks == "sc") {
                            Xcrud.renderInlineFunctionality(this);
                        }
                    }
                }
            }
        });

        $('.xcrud-list td, .xcrud-row span').dblclick(function(e) {

            //validate to check if another field is being edited
            if ($('.xcrud-list .xcrud-input').length == 0) {
                var clickedCell = this;
                var identifier = $(this).attr("identifier");

                if (identifier) {
                    var fields = identifier.split('-');
                    var clicks = fields[2];
                    if (clicks == "dc") {
                        Xcrud.renderInlineFunctionality(this);
                    }
                }

            }

        });
    },
    selectBox_switchImageUrl: function()
	{
		if(this.src.indexOf(Xcrud.arrowImage)>=0){
			this.src = this.src.replace(Xcrud.arrowImage,Zcrud.arrowImageOver);	
		}else{
			this.src = this.src.replace(Xcrud.arrowImageOver,Xcrud.arrowImage);
		}	
	},
    selectBox_showOptions: function()
	{
		if(Xcrud.editableSelect_activeArrow && Xcrud.editableSelect_activeArrow!=this){
			Xcrud.editableSelect_activeArrow.src = Xcrud.arrowImage;
			
		}
		Xcrud.editableSelect_activeArrow = this;
		
		var numId = this.id.replace(/[^\d]/g,'');
		var optionDiv = document.getElementById('selectBoxOptions' + numId);
		if(optionDiv.style.display=='block'){
			optionDiv.style.display='none';
			if(navigator.userAgent.indexOf('MSIE')>=0)document.getElementById('selectBoxIframe' + numId).style.display='none';
			this.src = Xcrud.arrowImageOver;	
		}else{			
			optionDiv.style.display='block';
			if(navigator.userAgent.indexOf('MSIE')>=0)document.getElementById('selectBoxIframe' + numId).style.display='block';
			this.src = Xcrud.arrowImageDown;	
			if(Xcrud.currentlyOpenedOptionBox && Xcrud.currentlyOpenedOinitializeInlineptionBox!=optionDiv)Xcrud.currentlyOpenedOptionBox.style.display='none';	
			Xcrud.currentlyOpenedOptionBox= optionDiv;			
		}
	},
    selectOptionValue: function()
	{
		var parentNode = this.parentNode.parentNode;
		var textInput = parentNode.getElementsByTagName('INPUT')[0];
		textInput.value = this.innerHTML;	
		this.parentNode.style.display='none';	
		document.getElementById('arrowSelectBox' + parentNode.id.replace(/[^\d]/g,'')).src = Xcrud.arrowImageOver;
		
		if(navigator.userAgent.indexOf('MSIE')>=0)document.getElementById('selectBoxIframe' + parentNode.id.replace(/[^\d]/g,'')).style.display='none';
		
	},
    highlightSelectBoxOption: function()
	{
		if(this.style.backgroundColor=='#316AC5'){
			this.style.backgroundColor='';
			this.style.color='';
		}else{
			this.style.backgroundColor='#316AC5';
			this.style.color='#FFF';			
		}	
		
		if(Xcrud.activeOption){
			Xcrud.activeOption.style.backgroundColor='';
			Xcrud.activeOption.style.color='';			
		}
		Xcrud.activeOption = this;
		
	},
    createEditableSelect: function(dest)
	{

		dest.className='selectBoxInput xcrud-input form-control';		
		var div = document.createElement('DIV');
		div.style.styleFloat = 'left';
		div.style.width = dest.offsetWidth + 100 + '%';
		div.style.position = 'relative';
		div.id = 'selectBox' + Xcrud.selectBoxIds;
		var parent = dest.parentNode;
		parent.insertBefore(div,dest);
		div.appendChild(dest);	
		div.className='selectBox';
		div.style.zIndex = 10000 - Xcrud.selectBoxIds;

		var img = document.createElement('IMG');
		img.src = Xcrud.arrowImage;
		img.className = 'selectBoxArrow';
		
		img.onmouseover = Xcrud.selectBox_switchImageUrl;
		img.onmouseout = Xcrud.selectBox_switchImageUrl;
		img.onclick = Xcrud.selectBox_showOptions;
		img.id = 'arrowSelectBox' + Xcrud.selectBoxIds;

		div.appendChild(img);
		
		var optionDiv = document.createElement('DIV');
		optionDiv.id = 'selectBoxOptions' + Xcrud.selectBoxIds;
		optionDiv.className='selectBoxOptionContainer';
		optionDiv.style.width = div.offsetWidth-2 + 'px';
		div.appendChild(optionDiv);
		
		if(navigator.userAgent.indexOf('MSIE')>=0){
			var iframe = document.createElement('<IFRAME src="about:blank" frameborder=0>');
			iframe.style.width = optionDiv.style.width;
			iframe.style.height = optionDiv.offsetHeight + 'px';
			iframe.style.display='none';
			iframe.id = 'selectBoxIframe' + Xcrud.selectBoxIds;
			div.appendChild(iframe);
		}
		
		if(dest.getAttribute('selectBoxOptions')){
			var options = dest.getAttribute('selectBoxOptions').split(';');
			var optionsTotalHeight = 0;
			var optionArray = new Array();
			for(var no=0;no<options.length;no++){
				var anOption = document.createElement('DIV');
				anOption.innerHTML = options[no];
				anOption.className='selectBoxAnOption';
				anOption.onclick = Xcrud.selectOptionValue;
				anOption.style.width = optionDiv.style.width.replace('px','') - 2 + 'px'; 
				anOption.onmouseover = Xcrud.highlightSelectBoxOption;
				optionDiv.appendChild(anOption);	
				optionsTotalHeight = optionsTotalHeight + anOption.offsetHeight;
				optionArray.push(anOption);
			}
			if(optionsTotalHeight > optionDiv.offsetHeight){				
				for(var no=0;no<optionArray.length;no++){
					optionArray[no].style.width = optionDiv.style.width.replace('px','') - 22 + 'px'; 	
				}	
			}		
			optionDiv.style.display='none';
			optionDiv.style.visibility='visible';
		}
		
		Xcrud.selectBoxIds = Xcrud.selectBoxIds + 1;
	}	
}; /** events */






$(document).ready(function() {

    if ($(".xcrud").length) {

        $(".xcrud").on("change", ".xcrud-actionlist", function() {
            var container = Xcrud.get_container(this);
            var data = Xcrud.list_data(container);
            Xcrud.request(container, data);
        });
        $(".xcrud").on("change", ".xcrud-daterange", function() {
            var container = Xcrud.get_container(this);
            if ($(this).val()) {
                $(container).find(".xcrud-datepicker-from").datepicker("setDate", new Date(($(this).find('option:selected').data('from') + new Date().getTimezoneOffset() * 60) * 1000));
                $(container).find(".xcrud-datepicker-to").datepicker("setDate", new Date(($(this).find('option:selected').data('to') + new Date().getTimezoneOffset() * 60) * 1000));
            } else {
                $(container).find(".xcrud-datepicker-from,.xcrud-datepicker-to").val('');
            }
        });
        $(".xcrud").on("change", ".xcrud-columns-select", function() {
            var container = Xcrud.get_container(this);
            var type = $(this).children("option:selected").data('type');
            var fieldname = $(this).children("option:selected").val();
            Xcrud.change_filter(type, container, fieldname);
        });



        $(".xcrud").on("click", ".xcrud-action", function() {


            var confirm_text = $(this).data('confirm');
            if (confirm_text && !window.confirm(confirm_text)) {
                return;
            } else {

                var container = Xcrud.get_container(this);
                var data = Xcrud.list_data(container, this);

                if ($(this).attr("advanced-search")) { //Advanced search trigger
                    data.advancedsearch = $(this).attr("advanced-search");
                    //data = Xcrud.list_data(container, this);
                }

                if ($(".edit_side_panel").length) {
                    if ($(this).parent().parent().hasClass('xcrud-nav') || $(this).parent().parent().parent().hasClass('xcrud-nav')) {
                        var editKey = $(".edit_side_panel").find(".xcrud-data[name=key]:first").val();
                        if (editKey != "") {
                            $(".xcrud-ajax").find(".xcrud-data[name=key]:first").val(editKey);
                        }

                        //$(".edit_side_panel").html("");						
                        data.task = 'list';
                    }
                }

                if ($(this).hasClass('xcrud-in-new-window')) {
                    Xcrud.new_window_request(container, data);
                } else {
                    if (data.task == 'save') {
                        if (!Xcrud.validation_error) {
                            Xcrud.unique_check(container, data, function(container) {
                                data.task = 'save';
                                Xcrud.request(container, data);
                            });
                        } else {
                            Xcrud.show_message(container, Xcrud.lang('validation_error'), 'error');
                        }
                    } else {
                        Xcrud.request(container, data);
                    }
                }
            }
            return false;
        });
        $(".xcrud").on("click", ".xcrud-toggle-show", function() {
            var container = $(this).closest(".xcrud").find(".xcrud-container:first");
            var closed = $(this).hasClass("xcrud-toggle-down");
            if (closed) {
                $(container).stop(true, true).delay(100).slideDown(200, function() {
                    $(document).trigger("xcrudslidedown");
                    $(container).trigger("xcrudslidedown");
                });
                //$(this).removeClass("xcrud-toggle-down");
                //$(this).addClass("xcrud-toggle-up");
                $(this).closest(".xcrud").find(".xcrud-main-tab").slideUp(200);
            } else {
                $(container).stop(true, true).slideUp(200, function() {
                    $(document).trigger("xcrudslideup");
                    $(container).trigger("xcrudslideup");
                });
                //$(this).removeClass("xcrud-toggle-up");
                //$(this).addClass("xcrud-toggle-down");
                $(this).closest(".xcrud").find(".xcrud-main-tab").delay(100).slideDown(200);
            }
            return false;
        });
        $(".xcrud").on("keypress", ".xcrud-input", function(e) {
            return Xcrud.pattern_callback(e, this);
        });
        $(".xcrud").on("click", ".xcrud-search-toggle", function() {
            $(this).hide(200);
            $(this).closest(".xcrud-ajax").find(".xcrud-search").show(200);
            return false;
        });

        $(".xcrud").on("click", ".btn_search_values", function() {
            var r = $(this).closest(".search_values").attr('data');
            $(this).closest(".xcrud-ajax").find("input[name='" + r + "']").val("");
            $(this).closest(".xcrud-ajax").find("option:selected").removeAttr("selected");

            $(this).closest(".xcrud-ajax").find("a[advanced-search='1']").click();
            return false;
        });



        $(".xcrud").on("click", ".xcrud-advanced-search-toggle", function() {
            //$(this).hide(200);
            if ($(this).closest(".xcrud-ajax").find(".xcrud-advanced-search").is(":visible")) {
                if ($(".xcrud-advanced-search").attr("opened") == 1) {

                } else {
                    $(this).closest(".xcrud-ajax").find(".xcrud-advanced-search").hide(200);
                    $(this).closest(".xcrud-ajax").find(".xcrud-list-container").removeClass('col-sm-9');
                    $(this).closest(".xcrud-ajax").find(".xcrud-list-container").addClass('col-sm-12');
                    $(this).closest(".xcrud-ajax").find(".xcrud-list-container").removeClass('fr');

                    $(this).closest(".xcrud-ajax").find(".xcrud-list-container").removeClass('twelve wide column');
                    $(this).closest(".xcrud-ajax").find(".xcrud-list-container").addClass('sixteen wide column');

                    $(this).closest(".xcrud-ajax").find(".xcrud-list-container").removeClass('grid-shrinked');
                    $(this).closest(".xcrud-ajax").find(".xcrud-list-container").addClass('grid-expanded');
                }

            } else {
                $(this).closest(".xcrud-ajax").find(".xcrud-advanced-search").show(200);
                $(this).closest(".xcrud-ajax").find(".xcrud-list-container").removeClass('col-sm-12');
                $(this).closest(".xcrud-ajax").find(".xcrud-list-container").addClass('col-sm-9');
                $(this).closest(".xcrud-ajax").find(".xcrud-list-container").addClass('fr');
                $(this).closest(".xcrud-ajax").find(".xcrud-list-container").removeClass('sixteen wide column');
                $(this).closest(".xcrud-ajax").find(".xcrud-list-container").addClass('twelve wide column');

                $(this).closest(".xcrud-ajax").find(".xcrud-list-container").removeClass('grid-expanded');
                $(this).closest(".xcrud-ajax").find(".xcrud-list-container").addClass('grid-shrinked');

            }
            return false;
        });
        $(".xcrud").on("click", ".xcrud-search-more-toggle", function() {
            $(this).hide(200);
            $(this).closest(".xcrud-ajax").find(".xcrud-search").show(200);
            return false;
        });
        $(".xcrud").on("keydown", ".xcrud-searchdata", function(e) {
            if (e.which == 13) {
                var container = Xcrud.get_container(this);
                var data = Xcrud.list_data(container);
                data.search = 1;
                Xcrud.request(container, data);
                return false;
            }
        });

        $(".xcrud").on("keyup", ".xcrud-searchdata", function() {

            if (keypress_status == 0) {
                keypress_status = 1;
                if (Xcrud.config('search_on_typing') == true) {
                    var container = Xcrud.get_container(this);
                    var data = Xcrud.list_data(container);
                    data.search = 1;
                    data.phrase = this.value;
                    Xcrud.request(container, data, function(response) {

                        searchInput = $("[name=phrase]");
                        var strLength = searchInput.val().length * 2;
                        searchInput.focus();
                        searchInput[0].setSelectionRange(strLength, strLength);
                        keypress_status = 0;

                    });
                    return false;
                }
            }

        });

        $(".xcrud").on("change", ".xcrud-upload", function() {
            var container = Xcrud.get_container(this);
            var data = Xcrud.list_data(container);
            Xcrud.upload_file(this, data, container);
            return false;
        });
        $(".xcrud").on("click", ".xcrud-remove-file", function() {
            var container = Xcrud.get_container(this);
            var data = Xcrud.list_data(container);
            Xcrud.remove_file(this, data, container);
            return false;
        });
        $(".xcrud").on("click", ".xcrud_modal", function() {
            var content = $(this).data("content");
            var header = $(this).data("header");
            Xcrud.modal(header, content, this);
            return false;
        });


        $(".xcrud-ajax").each(function() {

            Xcrud.init_datepicker(this);
            Xcrud.init_datepicker_range($(this).find('.xcrud-columns-select option:selected').data('type'), this);
            Xcrud.depend_init(this);
            Xcrud.display_logic_init(this);
            Xcrud.disable_logic_init(this);
            Xcrud.readonly_logic_init(this);
            Xcrud.map_init(this);
            Xcrud.check_fixed_buttons();
            Xcrud.init_tooltips(this);
            Xcrud.init_tabs(this);
            Xcrud.check_message(this);
            Xcrud.check_script(this);
            Xcrud.hide_progress(this);
            Xcrud.init_flatpickr();


            //alert("MMMM");

        });
    }
});
$(window).on("resize load xcrudslidetoggle", function() {
    Xcrud.check_fixed_buttons();
});
var items = [],
    options = [];
$(window).on("load", function() {

    $(".xcrud-ajax").each(function() {
        Xcrud.init_texteditor(this);
    });

    //select idividually
    $(".xcrud-bulk-checkbox").change(function() {
        if ($(this).prop("checked")) {
            items.push($(this).val());
        } else {
            Xcrud.removeItemOnce(items, this.value);
        }
    });

    Xcrud.initializeInline();
    //Bulk select from header

    $(".xcrud-bulk-checkbox-main").change(function() {
        var mainChecked = $(this).prop("checked");
        $('.xcrud-bulk-checkbox').each(function() {
            $(this).prop("checked", mainChecked);
            if (mainChecked) {
                items.push($(this).val());
            } else {
                Xcrud.removeItemOnce(items, this.value);
            }
        });
    });

    //$(".xcrud-actions #")

});
$(document).on("xcrudbeforerequest", function(event, container) {});
$(document).on("xcrudafterrequest", function(event, container) {
    console.log("xcrudafterrequest");
    Xcrud.initializeInline();
    Xcrud.init_datepicker(container);
    Xcrud.init_texteditor(container);
    Xcrud.init_datepicker_range($(container).find('.xcrud-columns-select option:selected').data('type'), container);
    Xcrud.depend_init(container);
    Xcrud.display_logic_init(container);
    Xcrud.disable_logic_init(container);
    Xcrud.readonly_logic_init(container);
    Xcrud.map_init(container);
    Xcrud.check_fixed_buttons();
    Xcrud.init_tooltips(container);
    Xcrud.init_tabs(container);
    Xcrud.renderCheckboxes(container);

    $(function() {
        'use strict';

        try {
            // Initialize the jQuery File Upload widget:
            $('#fileupload').fileupload({
                // Uncomment the following to send cross-domain cookies:
                //xhrFields: {withCredentials: true},
                url: Xcrud.config('blue_imp_server')
            });


            // Enable iframe cross-domain access via redirect option:
            $('#fileupload').fileupload(
                'option',
                'redirect',
                window.location.href.replace(/\/[^/]*$/, '/cors/result.html?%s')
            );

            // Load existing files:
            $('#fileupload').addClass('fileupload-processing');
            $.ajax({
                    // Uncomment the following to send cross-domain cookies:
                    //xhrFields: {withCredentials: true},
                    url: $('#fileupload').fileupload('option', 'url'),
                    dataType: 'json',
                    context: $('#fileupload')[0]
                })
                .always(function() {
                    $(this).removeClass('fileupload-processing');
                })
                .done(function(result) {
                    $(this)
                        .fileupload('option', 'done')
                        // eslint-disable-next-line new-cap
                        .call(this, $.Event('done'), { result: result });
                });
        } catch (e) {

        }
    });

    try {
        $('[tab-name="' + Xcrud.current_tab + '"]').click();
    } catch (e) {

    }

    setTimeout(function() {
        try {

            var
            // save a reference to the video element			  
                video = document.querySelector('video'),
                // save a reference to the video.js player for that element
                player = videojs(video);
            player.fluid(true);
            videojs.options.autoplay = true;

            // initialize the plugin with some custom options:
            player.simpleoverlay({
                'vjs-sample-overlay': {
                    start: 2,
                    end: 10,
                    textContent: 'Hello, world!'
                }
            });

        } catch (e) {

        }

    }, 1);
});

//
/** print */
$.extend({
    print_window: function(print_win, xcrud) {
        var data = {};
        $(xcrud).find(".xcrud-data").each(function() {
            data[$(this).attr("name")] = $(this).val();
        });
        data.task = 'print';
        $.ajax({
            data: data,
            success: function(out) {
                print_win.document.open();
                print_win.document.write(out);
                print_win.document.close();
                $(xcrud).find(".xcrud-data[name=key]:first").val($(print_win.document).find(".xcrud-data[name=key]:first").val());
                var ua = navigator.userAgent.toLowerCase();
                if ((ua.indexOf("opera") != -1)) { // opera fix
                    $(print_win).load(function() {
                        print_win.print();
                    });
                } else {
                    $(print_win).ready(function() {
                        print_win.print();
                    });
                }
            }
        });
    }
});
// 
/** upload */
$.extend({
    createUploadIframe: function(id, uri) {
        var frameId = 'jUploadFrame' + id;
        var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
        if (window.ActiveXObject) {
            if (typeof uri == 'boolean') {
                iframeHtml += ' src="' + 'javascript:false' + '"';
            } else if (typeof uri == 'string') {
                iframeHtml += ' src="' + uri + '"';
            }
        }
        iframeHtml += ' />';
        $(iframeHtml).appendTo(document.body);
        return $('#' + frameId).get(0);
    },
    createUploadForm: function(id, fileElementId, data) {
        var formId = 'jUploadForm' + id;
        var fileId = 'jUploadFile' + id;
        var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
        if (data) {
            for (var i in data.xcrud) {
                if (data.xcrud[i] == 'postdata') {
                    /*for (var j in data.xcrud.postdata) {
                    			             $('<input type="hidden" name="xcrud[postdata][' + j + ']" value="' + data.xcrud.postdata[j] + '" />').appendTo(form);
                    			         }*/
                } else
                    $('<input type="hidden" name="xcrud[' + i + ']" value="' + data.xcrud[i] + '" />').appendTo(form);
            }
        }
        var oldElement = $('#' + fileElementId);
        var newElement = $(oldElement).clone();
        $(oldElement).attr('id', fileId);
        $(oldElement).before(newElement);
        $(oldElement).appendTo(form);
        $(form).css('position', 'absolute');
        $(form).css('top', '-1200px');
        $(form).css('left', '-1200px');
        $(form).appendTo('body');
        return form;
    },
    ajaxFileUpload: function(s) {
        s = $.extend({}, $.ajaxSettings, s);
        var id = new Date().getTime();
        var form = $.createUploadForm(id, s.fileElementId, (typeof(s.data) == 'undefined' ? false : s.data));
        var io = $.createUploadIframe(id, s.secureuri);
        var frameId = 'jUploadFrame' + id;
        var formId = 'jUploadForm' + id;
        if (s.global && !$.active++) {
            $.event.trigger("ajaxStart");
        }
        var requestDone = false;
        var xml = {};
        if (s.global) $.event.trigger("ajaxSend", [xml, s]);
        var uploadCallback = function(isTimeout) {
            var io = document.getElementById(frameId);
            try {
                if (io.contentWindow) {
                    xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;
                } else if (io.contentDocument) {
                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                }
            } catch (e) {}
            if (xml || isTimeout == "timeout") {
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    if (status != "error") {
                        var data = $.uploadHttpData(xml, s.dataType);
                        if (s.success) s.success(data, status);
                        if (s.global) $.event.trigger("ajaxSuccess", [xml, s]);
                    } else {}
                } catch (e) {
                    status = "error";
                }
                if (s.global) $.event.trigger("ajaxComplete", [xml, s]);
                if (s.global && !--$.active) $.event.trigger("ajaxStop");
                if (s.complete) s.complete(xml, status);
                $(io).unbind();
                setTimeout(function() {
                    try {
                        $(io).remove();
                        $(form).remove();
                    } catch (e) {}
                }, 100);
                xml = null
            }
        };
        if (s.timeout > 0) {
            setTimeout(function() {
                if (!requestDone) uploadCallback("timeout");
            }, s.timeout);
        }
        try {
            var form = $('#' + formId);
            $(form).attr('action', s.url);
            $(form).attr('method', 'POST');
            $(form).attr('target', frameId);
            if (form.encoding) {
                $(form).attr('encoding', 'multipart/form-data');
            } else {
                $(form).attr('enctype', 'multipart/form-data');
            }
            $(form).submit();
        } catch (e) {}
        var ttt = 0;
        var ua = navigator.userAgent.toLowerCase();
        if ((ua.indexOf("opera") != -1)) { // opera fix
            $('#' + frameId).load(function() {
                ttt++;
                if (ttt == 2) {
                    uploadCallback();
                }
            });
        } else {
            $('#' + frameId).on("load", uploadCallback);
        }
        return {
            abort: function() {}
        };
    },
    uploadHttpData: function(r, type) {
        data = (type == "xml" && !type) ? r.responseXML : r.responseText;
        if (type == "script") $.globalEval(data);
        if (type == "json") eval("data = " + data);
        return data;
    }
});
