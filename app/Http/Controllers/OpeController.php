<?php

namespace App\Http\Controllers;

use App\Http\Resources\MemoResource;
use App\Http\Resources\TagResource;
use Illuminate\Http\Request;
use App\Models\Memo;
use App\Models\MemoTag;
use App\Models\Tag;
use DB;

class OpeController extends Controller
{

    // メモ取得
    public function getMemos(Request $request)
    {

        // ユーザーIDに紐づくメモ一覧の取得
        $memos = Memo::where('user_id', '=', $request->user()->id)
            ->whereNull('deleted_at')
            ->orderBy('id', 'DESC')
            ->get();

        return MemoResource::collection($memos);
    }

    // 選択メモ取得
    public function getSelectedMemo(Request $request)
    {

        // 選択されたメモ情報の取得
        $selected_memo_info = Memo::select('memos.*', 'memo_tags.tag_id')
            ->leftJoin('memo_tags', 'memos.id', '=', 'memo_tags.memo_id')
            ->where('memos.id', '=', $request->input('memo_id'))
            ->where('memos.user_id', '=', $request->user()->id)
            ->whereNull('memos.deleted_at')
            ->get();

        return MemoResource::collection($selected_memo_info);
    }

    // タグ取得
    public function getTags(Request $request)
    {

        // ユーザーIDに紐づくタグ一覧の取得
        $tags = Tag::where('user_id', '=', $request->user()->id)
            ->whereNull('deleted_at')
            ->orderBy('id', 'DESC')
            ->get();

        return TagResource::collection($tags);
    }

    // タグIDに紐づくメモ情報取得
    public function getMemosByTagId(Request $request)
    {

        // タグIDに紐づくメモ一覧の取得
        $memos = Memo::where('memo_tags.tag_id', '=', $request->input('tag_id'))
            ->leftJoin('memo_tags', 'memos.id', '=', 'memo_tags.memo_id')
            ->where('memos.user_id', '=', $request->user()->id)
            ->whereNull('memos.deleted_at')
            ->orderBy('memos.id', 'DESC')
            ->get();

        return MemoResource::collection($memos);
    }

    // メモ登録
    public function createMemo(Request $request)
    {

        $is_success = false;

        $is_success = DB::transaction(function () use ($request) {

            // 新規メモ設定ありの場合
            if (!empty($request['content'])) {
                // メモ登録
                $memo_id = Memo::insertGetId(
                    [
                        'content' => $request['content'],
                        'user_id' => $request->user()->id
                    ]
                );
            }

            // 新規タグ設定ありの場合
            if (!empty($request['newTagName'])) {

                // タグ登録
                $tag_id = Tag::insertGetId(
                    [
                        'name' => $request['newTagName'],
                        'user_id' => $request->user()->id
                    ]
                );

                // メモとタグの紐付け登録
                if (!empty($request['content'])) {
                    MemoTag::insert([
                        'memo_id' => $memo_id,
                        'tag_id' => $tag_id
                    ]);
                }
            }

            // メモ内容入力有りかつタグチェック有りの場合
            if (!empty($request['content']) && !empty($request['checkedTagItems'])) {

                // メモとタグの紐付けを登録
                foreach ($request['checkedTagItems'] as $tag_key) {
                    MemoTag::insert([
                        'memo_id' => $memo_id,
                        'tag_id' => $tag_key
                    ]);
                }
            }
            return true;
        });

        return $is_success;
    }

    // メモ更新
    public function updateMemo(Request $request)
    {

        $is_success = false;

        $is_success = DB::transaction(function () use ($request) {

            // メモとタグの紐付けを一旦全削除
            MemoTag::where('memo_id', '=', $request['memo_id'])
                ->delete();

            // チェックタグ有りの場合
            if (!empty($request['checkedTagItems'])) {

                // 登録
                foreach ($request['checkedTagItems'] as $tag_key) {

                    // メモとタグの紐付け登録
                    MemoTag::insert([
                        'memo_id' => $request['memo_id'],
                        'tag_id' => $tag_key
                    ]);
                }
            }

            // メモ更新
            Memo::where('id', '=', $request['memo_id'])
                ->where('user_id', '=', $request->user()->id)
                ->update(['content' => $request['content']]);

            // 新規タグ設定ありの場合
            if (!empty($request['newTagName'])) {

                // タグ登録
                $tag_id = Tag::insertGetId(
                    [
                        'name' => $request['newTagName'],
                        'user_id' => $request->user()->id
                    ]
                );

                // メモとタグの紐付け登録
                MemoTag::insert([
                    'memo_id' => $request['memo_id'],
                    'tag_id' => $tag_id
                ]);
            }
            return true;
        });


        return $is_success;
    }

    // メモ削除
    public function destroyMemo(Request $request)
    {

    $is_success = false;

    $is_success = DB::transaction(function () use ($request) {

    // メモとタグの紐付けを全削除
    MemoTag::where('memo_id', '=', $request['memo_id'])
    ->delete();

    // メモ更新
    Memo::where('id', '=', $request['memo_id'])
    ->where('user_id', '=', $request->user()->id)
    ->update(['deleted_at' => date('Y-m-d H:i:s', time())]);

    return true;
    });


    return $is_success;
    }
}
