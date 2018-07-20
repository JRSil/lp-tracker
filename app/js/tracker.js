window.onload = function() {

	const carousel = new Siema({
		selector: '.carousel',
		duration: 500,
		loop: true,
		draggable: false
	});

	setInterval(() => carousel.next(), 5000);

	mobileWidth();
	flipHeight();
	var wow = new WOW({
		mobile: false
	});
	wow.init();

	$('#loader').fadeOut('slow');

	$(window).resize(function(){
		mobileWidth();
		flipHeight();
	});

	$("#card").flip({
		trigger: 'manual'
	});

	$('#tel, #cel').focusout(function(){
		var phone, element;
		element = $(this);
		element.unmask();
		phone = element.val().replace(/\D/g, '');
		if(phone.length > 10) {
			element.mask("(99) 99999-9999");
		} else {
			element.mask("(99) 9999-99999");
		}
	}).focusout();

	$('#submit').on('click', function(e) {
		e.preventDefault();
		$(this).attr('disabled', true);

		nome = $('#nome').val();
		email = $('#email').val();

		cel = $('#cel').val();
		celFull = cel.replace(/\(|\)|\-|\s/g, '');
		celDDD = celFull.slice(0,2);
		celNum = celFull.slice(2);

		tel = $('#tel').val();
		telFull = tel.replace(/\(|\)|\-|\s/g, '');
		telDDD = telFull.slice(0,2);
		telNum = telFull.slice(2);

		veiculo = $('#veiculo').val();
		modelo = $('#modelo').val();

		if (validaForm()) {
			$.ajax({
				method: 'POST',
				url: 'uranet.php',
				dataType: 'text',
				data: {
					nome: nome,
					email: email,
					celDDD: celDDD,
					celNum: celNum,
					telDDD: telDDD,
					telNum: telNum,
					veiculo: veiculo,
					modelo: modelo
				},
				success: function() {
					dataLayer.push({
						event: 'leadEnviado'
					});

					$('#card').flip('toggle');

					$.each($('input[type=text], input[type=email]'), function(key,val) {
						$(val).val('')
					});

					setTimeout(function() {
						$('#card').flip('toggle');
					}, 3000);
				}
			});
		}
		
		$('#submit').attr('disabled', false);
	});
	
	$('.faq-header img').click(function(){
		if (mobile) {
			$('.modal').addClass('rolagem');
			$('.main').addClass('esconde');
		}
		$('.faq-modal').show();
	});

	$('.faq-header img').click(function(){
		if (mobile) {
			$('.modal').addClass('rolagem');
			$('.main').addClass('esconde');
		}
		$('.faq-modal').show();
	});

	$('.grade-solucoes.tracker-seguro').click(function(){
		if (mobile) {
			$('.modal').addClass('rolagem');
			$('.main').addClass('esconde');
		}
		$('.seg-modal').show();
	});

	$('.grade-solucoes.roubo-furto').click(function(){
		if (mobile) {
			$('.modal').addClass('rolagem');
			$('.main').addClass('esconde');
		}
		$('.rast-modal').show();
	});

	$('.grade-solucoes.visu-web').click(function(){
		if (mobile) {
			$('.modal').addClass('rolagem');
			$('.main').addClass('esconde');
		}
		$('.gps-modal').show();
	});

	$('.grade-solucoes.roubo-web').click(function(){
		if (mobile) {
			$('.modal').addClass('rolagem');
			$('.main').addClass('esconde');
		}
		$('.log-modal').show();
	});

	$('.botao-fechar').click(function(){
		$('.modal').hide();
		$('.main').removeClass('esconde');
		$('.modal').removeClass('rolagem');
	});

	function validaForm() {
		var formStatus = true;
		$('.empty').removeClass('empty');

		if (typeof nome === 'undefined' || nome == '' || nome == null) {
			formStatus = false;
			$('#nome').addClass('empty');
		}
		if (String(email).match(/.+@.+\..+/i) == null || String(email) == null) {
			formStatus = false;
			$('#email').addClass('empty');
		}
		// if (typeof tel.match(/\(\d{2}\)\s(\d{5}|\d{4})\-\d{4}/) === 'undefined' || tel.match(/\(\d{2}\)\s(\d{5}|\d{4})\-\d{4}/) == '' ||  tel.match(/\(\d{2}\)\s(\d{5}|\d{4})\-\d{4}/) == null) {
		// 	formStatus = false;
		// 	$('#tel').addClass('empty');
		// }
		if (typeof cel.match(/\(\d{2}\)\s(\d{5}|\d{4})\-\d{4}/) === 'undefined' || cel.match(/\(\d{2}\)\s(\d{5}|\d{4})\-\d{4}/) == '' ||  cel.match(/\(\d{2}\)\s(\d{5}|\d{4})\-\d{4}/) == null) {
			formStatus = false;
			$('#cel').addClass('empty');
		}
		if (typeof modelo === 'undefined' || modelo == '' || modelo == null) {
			formStatus = false;
			$('#modelo').addClass('empty');
		}

		return formStatus;
	}

	function mobileWidth() {
		w = $(window).width();

		if(w<=1024){
			mobile = true;
		} else {
			mobile = false;
		}

		if (mobile) {
			$('.rast-modal .conteudo img').attr('src','img/mobile-rf.png');
			$('.gps-modal .conteudo img').attr('src','img/mobile-gps.png');
			$('.log-modal .conteudo img').attr('src','img/mobile-log.png');
			$('#carro img'[0]).attr('src','img/banners_mob_carro.png');
			$('#moto img').attr('src','img/banners_mob_moto.png');
			$('#caminhao img').attr('src','img/banners_mob_caminhao.png');
		} else {
			$('.rast-modal .conteudo img').attr('src','img/rf.png');
			$('.gps-modal .conteudo img').attr('src','img/gps.png');
			$('.log-modal .conteudo img').attr('src','img/log.png');
			$('#carro img'[0]).attr('src','img/banners_home_05.png');
			$('#carro img'[1]).attr('src','img/banners_seguro_01.png');
			$('#moto img').attr('src','img/banners_moto_01.png');
			$('#caminhao img').attr('src','img/banners_caminhao_01.png');
		}
	}

	function flipHeight() {
		var frontHeight = $('.front .flip-content').height();
		$('.back .flip-content').height(frontHeight);
	}
}