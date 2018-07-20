<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	if(isset($_POST['nome'])) {
		
		$leadNome = $_POST['nome'];
		$leadEmail = $_POST['email'];
		$leadCelDDD = $_POST['celDDD'];
		$leadCelNum = $_POST['celNum'];
		$leadTelDDD = $_POST['telDDD'];
		$leadTelNum = $_POST['telNum'];
		$leadVeiculo = $_POST['veiculo'];
		$leadModelo = $_POST['modelo'];
		$leadIntegracao = false;
		$leadId = null;
		$loginSuhai = null;
		$senhaSuhai = null;

		$client = new SoapClient("http://201.91.148.14/webservices/callback_tracker.php?wsdl");
		$params = array(
			"Nome" => $leadNome,
			"DDDTelefone" => $leadTelDDD,
			"Telefone" => $leadTelNum,
			"Email" => $leadEmail,
			"DDDCelular" => $leadCelDDD,
			"Celular" => $leadCelNum,
			"Observacao" => $leadModelo,
			"IdInclusor" => "Lead",
			"Operacao" => "qGwfd2SQPXQy6AXeEsti0H4=",
			"Cep" => "Lead",
			"OrigemLead" => "Origem",
			"TipoProduto" => $leadVeiculo,
			"RangePreco" => "Lead",
			"Etapa" => "Lead",
			//"leadId " => $leadId								// temporary ID from URANet - determines second interaction
		);
		
		// var_dump($params);
		$fst_response = $client->__soapCall("IncluirRegistroCallback", $params);
		var_dump($fst_response);

		if (!is_null($fst_response['leadId'])) {
			$leadIntegracao = true;
			$loginSuhai = $fst_response['loginSuhai'];
			$senhaSuhai = $fst_response['senhaSuhai'];
			$leadId = $fst_response['leadId'];

			$params['leadId'] = $leadId;
			$scnd_response = $client->__soapCall("IncluirRegistroCallback", $params);

			// var_dump($params);
			var_dump($scnd_response);
		}

		// database
		$servername = "database.ckqcw9v6rjqi.sa-east-1.rds.amazonaws.com";
		$username = "sam_master";
		$password = "deliverance";
		$dbname = "md_tracker_lp";

		// connect
		$conn = mysqli_connect($servername,$username,$password,$dbname,'3306');

		if (!$conn) {
			die('Could not connect: '.mysqli_error());
		}

		$leadNome = utf8_decode($leadNome);
		$leadVeiculo = utf8_decode($leadVeiculo);
		$leadModelo = utf8_decode($leadModelo);

		$columns = "nome,email,celular,telefone,veiculo,modelo,integracao,id_uranet,login_suhai,senha_suhai";
		$values = "'$leadNome','$leadEmail','$leadCelDDD $leadCelNum','$leadTelDDD $leadTelNum','$leadVeiculo','$leadModelo','$leadIntegracao','$leadId','$loginSuhai','$senhaSuhai'";
		$sql = "INSERT INTO leads ($columns) VALUES ($values)";

		if (!mysqli_query($conn,$sql)) {
			echo("Error description: " . mysqli_error($conn));
		}
	} else {
		echo 'No post';
	}
?>