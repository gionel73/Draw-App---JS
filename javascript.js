$(() => {
    
    var paint, paintErase, canv, ctx, container, mouse;
    paint = false;
    paintErase = "paint";
    canv = document.getElementById("paint");
    ctx = canv.getContext('2d');
    container = $("#container");
    mouse = {
        x: 0,
        y: 0
    };

    if (localStorage.getItem("imgCanvas")) {
        var img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    }

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    container.mousedown((e) => {
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - container.offset().left;
        mouse.y = e.pageY - container.offset().top;
        ctx.moveTo(mouse.x, mouse.y);
    });

    container.mousemove((e) => {
        mouse.x = e.pageX - container.offset().left;
        mouse.y = e.pageY - container.offset().top;

        if (paint) {
            if (paintErase == "paint") {
                ctx.strokeStyle = $("#paint-color").val();
            } else {
                ctx.strokeStyle = 'white';
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });

    container.mouseup(() => {
        paint = false;
    });
    container.mouseleave(() => {
        paint = false;
    });

    $("#erase").click(() => {
        if (paintErase == "paint") {
            paintErase = "erase";
        } else {
            paintErase = "paint";
        }
        $("#erase").toggleClass("erase-mode");
    });

    $("#reset").click(() => {
        ctx.clearRect(0, 0, canv.width, canv.height);
        paintErase = "paint";
        $("#erase").removeClass("erase-mode");
    });

    $("#save").click(() => {
        if (typeof (localStorage) != null) {
            localStorage.setItem("imgCanvas", canv.toDataURL());
        } else {
            window.alert('Your browser not support local storage!');
        }
    });
    
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: (event, ui) => {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });

	$("#paint-color").change(() => {
		$("#circle").css("background-color", $("#paint-color").val());
		ctx.strokeStyle = $("#paint-color").val();
	});

});
