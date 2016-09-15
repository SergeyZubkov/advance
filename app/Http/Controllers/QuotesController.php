<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use App\Quote;

class QuotesController extends Controller
{
    //
  public function getAllQuotes() 
  {
         $quotes = Quote::all();
         return $quotes;
  }

  public function addQuote(Request $request) 
  {
      $author = ucfirst($reuest['author']);
      $text = request['text'];
      $newQuote = Quote::create([
          'author' => $author,
          'text' => $text
          ]);
      return response()->json($newQuote);
  }

  public function deleteQuoteById(Request $request) 
  {
      $dQ = Quote::find($request->get('id'));
      Quote::destroy($request->get('id'));
      return response()->json($dQ);
  }

  public function updateQuote(Request $request) 
  {
      $quote = Quote::find($request->get('id'));
      $quote->author = $request->get('author');
      $quote->text = $request->get('text');
      $quote->save();
      return response()->json($quote);
  }

  public function getRandomQuotesForUser(Request $request) 
  {
      $user_id = $request->get('user')['id'];
      $user = User::find($user_id);
      $showedQuotesArr = preg_split('/ /', ($user->showed_quotes));
      $quotes = Quote::orderBy('id')->select('id')->get();
      $possibleIds = [];
      foreach ($quotes as $quote) {
          if(!array_search($quote->id, $showedQuotesArr)) {
              array_push($possibleIds, $quote->id);
          }
      }
      if (count($possibleIds)) {
          $ids = [];
          $counter = 3;
          while ($counter) {
            $id = $possibleIds[mt_rand(0,count($possibleIds)-1)];
            array_push($ids, $id);
            $counter--;
          }
          array_push($showedQuotesArr, $id);
          $user->showed_quotes = join(" ", $showedQuotesArr);
          $user->save();
          $rndQuote = Quote::whereIn('id', $ids)->get();
          return response()->json($rndQuote);
      } else {
          return response()->json(['error' => 'all_quotes_showed!']);
      }
  }
}
